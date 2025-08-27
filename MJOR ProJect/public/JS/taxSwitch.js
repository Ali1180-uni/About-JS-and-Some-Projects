    let toogle = document.getElementById('flexSwitchCheckDefault');
    toogle.addEventListener("click",()=>{
      let tax = document.getElementsByClassName('Tax-info');
      // console.log(tax);
      for(taxes of tax){
        if(taxes.style.display != "inline"){
          taxes.style.display = "inline";
        }else{
          taxes.style.display = "none";
        }
      }
    });