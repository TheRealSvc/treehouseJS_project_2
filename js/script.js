/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Stephan von Coelln
*/

const itemsPP = 9 ; // this is to parametrize the number of students displayed per page

/**
 * creates the search bar   
 */ 
function createSearchBar() {
   labelEl = document.createElement('label') ;
   labelEl.setAttribute('for','search') ;
   labelEl.className = 'student-search' ;

   inputEl = document.createElement('input') ;
   inputEl.setAttribute('id','search') ;
   inputEl.setAttribute('placeholder', 'Search by name...') ;
   
   buttonEl = document.createElement('button') ;
   buttonEl.setAttribute('type','button') ;

   imgEl = document.createElement('img') ;
   imgEl.src = "img/icn-search.svg" ;
   imgEl.setAttribute('alt','Search icon') ;

   buttonEl.appendChild(imgEl) ;
   labelEl.appendChild(inputEl) ;
   labelEl.appendChild(buttonEl) ;

   const header = document.querySelector('header.header') ;
   headerH2 = header.children[0] ;
   headerH2.appendChild(labelEl) ;
}


/**
 * creates and displayes all the students as list items 
 */
function createListItem(data, i) {
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


/**
 * returns the index of the active page 
 */
function getActivePage() {
   const ul = document.querySelector('ul.link-list') ;
   liCollection = ul.children ;
   if(liCollection.length == 0) {
      return 1 ;
   }
   for (i=1 ; i <= liCollection.length  ; i++) {
      but = liCollection[i-1].children[0] ;
      if (but.className === 'active') {
            return i ;
         }  
    }
   return 1 ;  
  }


/** 
* The `showPage` function
* This function will create the elements needed to display a "page" of itemsPerPage students
*/
function showPage(data,  itemsPerPage=itemsPP, init=false) {
   if (!init) {
      page = getActivePage() ;
   } else {
      page = 1 ;
   }   
   let startInd = (page * itemsPerPage) - itemsPerPage ;
   let endInd = Math.min(page * itemsPerPage, data.length) ;
   const ulBase = document.querySelector('ul.student-list') ;
   ulBase.innerHTML = '' ;
   for (i=startInd; i<endInd; i++) { 
      createListItem(data, i) ;
   }
}


/** 
 * calculates the number of required pages given date and items per page 
*/
function calcNumPages(data, itemsPerPage=itemsPP) {
   numEl = data.length ;
   numPages = Math.ceil(numEl/itemsPP) ;
   return numPages ;
}


/**
 * function to create the pagination-buttons
 * @param {i} i is the button-number  
 */
function createButtonLi(i) {
   div2 = document.createElement('div') ;
   div2.className = 'pagination' ;
   li = document.createElement('li') ;
   but = document.createElement('button') ;
   but.className = 'inactive' ; // initialization with default 
   but.textContent = i ;
   li.appendChild(but) ;
   return li ;
}


/**
 * function to switch the active pagination-button
 * @param {e} e is the event object 
 */
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


/** 
* Create the buttons for pagination
*/
function addButtons(data, itemsPP, init=false) {
   const ul = document.querySelector('ul.link-list') ;
   numPages = calcNumPages(data, itemsPP) ;
   ul.innerHTML = ''
  
   for (i=1 ; i <= numPages ; i++) { // creates all the list items containing student-info 
      buttonLi = createButtonLi(i) ;
      if (init && i==1) {buttonLi.children[0].className = 'active'} ;
      ul.appendChild(buttonLi) ;
   }
}


/** 
* Create the `addPagination` function
* This function will create and insert/append the elements needed for the pagination, but will also render the whole page 
*/
function addPagination(data, itemsPerPage=itemsPP) {
   const ul = document.querySelector('ul.link-list') ;
   showPage(data, itemsPerPage=itemsPerPage, init=true) ; // for initially showing page 1
   addButtons(data, itemsPerPage, init=true) ;
   createSearchBar() ;  // creating the search bar 
   var filtered = data ;

   // event handler for filtering
    const header = document.querySelector('header.header') ;
    searchInput = header.children[0].children[0].children[0] ;
    searchInput.addEventListener('keyup', (e) => { 
    filtered = data.filter(data => data.name.first.toLowerCase().startsWith(e.target.value.toLowerCase())) ;
      showPage(filtered, itemsPerPage, init=true) ;    
      addButtons(filtered, itemsPerPage,init=false) ;
    }) ;

   // event handler for pagination
   ul.addEventListener('click', (e) => { 
      if(e.target.tagName === 'BUTTON') {
         switchButtonStates(e) ;    
         showPage(filtered, itemsPerPage=itemsPerPage, init=false) ;
      } ;
   }) ;
}


// Call functions 
addPagination(data, itemsPP) ; 

