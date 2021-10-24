var products = [
    { 
        "name" : "3D Camera",
        "code" : "#451rh",
        "price" : 1500,
        "ImgSrc" : "./images/sony.jpeg"
    },
    { 
        "name" : "External Hard Drive",
        "code" : "#32fi",
        "price" : 800,
        "ImgSrc" : "./images/hard drive.jpeg"
    },
    { 
        "name" : "Wrist Watch",
        "code" : "#488d",
        "price" : 300,
        "ImgSrc" : "./images/wristwatch.jpeg"
    },
    {
        "name" : "PlayStation 5",
        "code" : "#hs340",
        "price" : 1000,
        "ImgSrc" : "./images/ps5.jpeg"
    },
    {    "name" : "Beats By Dr.Dre airpods",
        "code" : "#wj439",
        "price" : 800,
        "ImgSrc" : "./images/beats by Dr.dre.jpeg"
    }
    
];

function productDisplay(){
    products.forEach(product => {
        
        var mainDiv = document.createElement('div');

        mainDiv.className = 'secondFlex';
       
        var productNameparagraph = document.createElement('p');
        var productNameNode = document.createTextNode(product['name']);
        productNameparagraph.append(productNameNode);
        productNameparagraph.className = 'productName';

        var productCodeParagraph = document.createElement('p');
        var productCodeNode = document.createTextNode(product['code']); 
        productCodeParagraph.append(productCodeNode);
        productCodeParagraph.className = 'productCode';

        var productPriceParagraph = document.createElement('p');
        var productPriceNode = document.createTextNode('$' + product['price']);
        productPriceParagraph.append(productPriceNode)
        productPriceParagraph.className = 'productPrice';

        var form = document.createElement('form');
        var label = document.createElement('label');

        var addToCartButton = document.createElement('button');
        addToCartButton.innerHTML = 'Add To Cart';
        addToCartButton.className = 'add-to-cart';

        var inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.min = '1';

        var img = document.createElement('img');
        img.src = product['ImgSrc'];

        label.appendChild(inputField);
        form.appendChild(label);
        form.appendChild(addToCartButton);


        mainDiv.appendChild(img);
        mainDiv.appendChild(productNameparagraph);
        mainDiv.appendChild(productPriceParagraph);
        mainDiv.appendChild(productCodeParagraph);
        mainDiv.appendChild(form);

        var overrallDiv = document.getElementById('productsDiv');

        overrallDiv.appendChild(mainDiv);

        

        
    })
}

productDisplay();

const button = document.querySelectorAll('.add-to-cart');
var result = 0;
const tableItems = document.querySelector('#myTable');

button.forEach((addButton) => {
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
         var buttonBut = event.target;
         var buttonPar = buttonBut.parentElement.parentElement;
         var buttonItself = buttonPar.querySelector('input').value;
         var productCode = buttonPar.querySelector('.productCode').innerHTML;
         var buttonItem = buttonPar.querySelector('.productName').innerHTML;
         var moneyStuff = buttonPar.querySelector('.productPrice').innerHTML;
        
         const table = document.getElementById('myTable');


         var tablesChildren = Array.from(table.children);

         
         for (let index = 0; index < tablesChildren.length; index++) {
             if(index != 0){
                const element = tablesChildren[index];
                console.log(element);
                var cellsOfThisRow = Array.from(element.cells);
                var nameOfThisProduct = cellsOfThisRow[0].innerHTML;

                if(nameOfThisProduct == buttonItem){
                    var productsToAdd = 0;
                    if(buttonItself == ""){
                        productsToAdd = 1;
                    }
                    else{
                       productsToAdd = parseInt(buttonItself);
                       
                    }
                    var noOfProductsInCart = cellsOfThisRow[2].innerHTML;
                    var noOfProducts = parseInt(noOfProductsInCart);
                    console.log("NO OF PRoducts", noOfProducts,buttonItself);
                    noOfProducts += productsToAdd;
                    cellsOfThisRow[2].innerHTML = noOfProducts;

                    var moneyStuffDollarless = moneyStuff.replace('$', '');
                    var totalNumber = parseInt(moneyStuffDollarless);
                    
                    cellsOfThisRow[3].innerHTML = "$" + (noOfProducts * totalNumber);

                    result += (productsToAdd * totalNumber); 

                    const priceCompilation = document.querySelector('span');
                    priceCompilation.innerHTML = '$' + result; 


                    return;
                }

                console.log(nameOfThisProduct.innerHTML);
             }
             

             
         }



         const newRow = document.createElement('tr');

         const newCell = document.createElement('td');
         newCell.innerHTML = buttonItem;
         newRow.appendChild(newCell);

         const newCell1 = document.createElement('td');
         newCell1.innerHTML = productCode;
         newRow.appendChild(newCell1);

         const newCell3 = document.createElement('td');
         if (buttonItself === '') {
             newCell3.innerHTML = 1;
         } else {
            newCell3.innerHTML = buttonItself;
         }
         
         newRow.appendChild(newCell3);

         const newCell2 = document.createElement('td');
         newCell2.innerHTML = moneyStuff;
         newRow.appendChild(newCell2);

         const newCell4 = document.createElement('td');
         newCell4.classList.add('newCell');
         newCell4.innerHTML = '<i class="fas fa-times-circle"></i>' ;

         newRow.appendChild(newCell4);
        


         

         table.appendChild(newRow);  
         
         const priceCompilation = document.querySelector('span');
         

         
         var moneyStuffDollarless = moneyStuff.replace('$', '');
         var totalNumber = parseInt(moneyStuffDollarless);
         var totalQuantity = (totalNumber * newCell3.innerHTML);
         result += totalQuantity; 
         priceCompilation.innerHTML = '$' + result; 

           
         
         

    })
})


tableItems.addEventListener('click', remove);

function remove(e){
    let items = e.target;
    let parent = items.parentElement;
    let parentChildren = Array.from(parent.children);
    if(items.className === "newCell"){
        const priceCompilation = document.querySelector('span');
        var priceCompilationValue = priceCompilation.innerHTML.replace('$', '');
        var previousValueInt = parentChildren[3].innerHTML.replace('$', '')
        var previousQuantity = parentChildren[2].innerHTML
        console.log(priceCompilationValue, previousValueInt,previousQuantity);
        priceCompilation.innerHTML = priceCompilationValue - (previousValueInt);
        result = priceCompilationValue - (previousValueInt);
        parent.remove();
        console.log(previousQuantity, previousValueInt);

        
        
        
    }
}

