/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const itemsPP = 9 ; 

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
/*
data sample:
const data = [
   {
     name: {
       title: "Miss",
       first: "Ethel",
       last: "Dean",
     },
     email: "ethel.dean@example.com",
     registered: {
       date: "12-15-2005",
       age: 15,
     },
     picture: {
       large: "https://randomuser.me/api/portraits/women/25.jpg",
       medium: "https://randomuser.me/api/portraits/med/women/25.jpg",
       thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
     },
   }, 

   

# list items under student-list
   <ul class="student-list">

   <!-- Dynamically insert students here
     
     EXAMPLE - Student list item:

     <li class="student-item cf">
       <div class="student-details">
         <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
         <h3>Ethel Dean</h3>
         <span class="email">ethel.dean@example.com</span>
       </div>
       <div class="joined-details">
         <span class="date">Joined 12-15-2005</span>
       </div>
     </li>
*/

function createListItem(i) {
   const ulBase = document.querySelector('ul.student-list') ;

   const liAdd = document.createElement('li') ;
   liAdd.className = 'student-item cf' ;

   const divAdd1 = document.createElement('div') ;
   divAdd1.className = 'student-details' ; 

   const divAdd2 = document.createElement('div') ;
   divAdd2.className = 'joined-details' ; 

   const imgAdd = document.createElement('img') ;
   imgAdd.src = data[i].picture.medium ; 
   imgAdd.className = 'avatar' ;
   imgAdd.setAttribute('alt','Profile Picture') ;

   const header3Add = document.createElement('h3') ;
   header3Add.textContent = data[i].name.first ; 

   const spanAdd1 = document.createElement('span') ;
   spanAdd1.className = 'email' ;
   spanAdd1.textContent = data[i].email ;   

   const spanAdd2 = document.createElement('span') ;
   spanAdd2.className = 'date' ;
   spanAdd2.textContent = 'Joined '+data[i].registered.date ;   

   divAdd1.appendChild(imgAdd) ;
   divAdd1.appendChild(header3Add) ;
   divAdd1.appendChild(spanAdd1) ;

   divAdd2.appendChild(spanAdd2) ;

   liAdd.appendChild(divAdd1) ;
   liAdd.appendChild(divAdd2) ;

   ulBase.appendChild(liAdd) ;
   return ulBase ;
}

function getActivePage() {
   const ul = document.querySelector('ul.link-list') ;
   liCollection = ul.children ;
   if(liCollection.length == 0) {
      return 1 ;

   }
   for (i=0 ; i < liCollection.length  ; i++) {
      but = liCollection[i].children[0] ;
      if (but.className === 'active') {
            return i+1 ;
         }  
    }
   return 1 ;  
  }


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(data,  itemsPerPage=itemsPP) {
   page = getActivePage() ;
   let startInd = (page * itemsPerPage) - itemsPerPage ;
   let endInd = (page * itemsPerPage) ;
   const ulBase = document.querySelector('ul.student-list') ;
   ulBase.innerHTML = '' ;
   for (i=startInd; i<endInd; i++) { 
      createListItem(i) ;
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function calcNumPages(data, itemsPerPage=itemsPP) {
   numEl = data.length ;
   numPages = Math.floor(numEl/itemsPP) ;
   return numPages ;
}


//Display Pagination buttons 
function createButtonLi(i) {
   div2 = document.createElement('div') ;
   div2.className = 'pagination' ;

   //ul2 = document.createElement('ul') ;
   //ul2.className = 'link-list' ;

   li = document.createElement('li') ;
   but = document.createElement('button') ;
   but.className = 'inactive' ; // initialization with default 
   but.textContent = i ;
   li.appendChild(but) ;
   return li ;
}


function switchButtonStates(e) {
   ulLinkList =  e.target.parentNode.parentNode ;
   // set all active states to inactive
   liCollection = ulLinkList.children ;
   numLi = liCollection.length ; 
   for (i=0 ; i < numLi ; i++ ) {
      liCollection[i].children[0].className = 'inactive' ;
   }
   // set selected button state to active
   let  butto = e.target ;
   butto.className = 'active'  
}


function addPagination(data, itemsPerPage=itemsPP) {
   numPages = calcNumPages(data, itemsPP) ;
   const ul = document.querySelector('ul.link-list') ;

   for (i=0 ; i < numPages ; i++) {
      buttonLi = createButtonLi(i) ;
      ul.appendChild(buttonLi) ;
   }

   ul.addEventListener('click', (e) => { 
      if(e.target.tagName === 'BUTTON') {
         switchButtonStates(e) ;    
         showPage(data, itemsPerPage=itemsPP) ;
      }  
    }) ;
}


// Call functions
showPage(data, itemsPerPage=itemsPP) ;
addPagination(data, itemsPP) ;

