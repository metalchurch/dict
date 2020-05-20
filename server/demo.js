function ValidationRecord(){
    // app_win  iframe
    // sf_510_td  class textreadonly_container
    // email : profile_main / Primary Contact
    // cf_1357581   bank 
    // cf_1357576   transit
    // cf_1357577  institution
    // cf_1357578 account
    // sf_510_td *status
    // lockmsg  locked msg
    //<img src='/images/simpleicons/btn_85.gif' height="15px;" alt="Delete Item"  style="cursor: pointer;" onClick='removeBudget(7876022)'/>&nbsp;2019-Head Office-RBC Head Office-Corporate Donation-Other</td>

    // cf_1354331_div budget transit
    // cf_1354329_div  G/L
    var glGood = true;
    var tdChequeGood = true;
    var iframe = document.getElementById('app_win');

    

    //console.log(iframe);
    let chequeBank = iframe.contentWindow.document.getElementById('cf_1357581').value; 
    let chequeTransit = iframe.contentWindow.document.getElementById('cf_1357576').value;
    let chequeInstitution = iframe.contentWindow.document.getElementById('cf_1357577').value;
    let chequeAccount = iframe.contentWindow.document.getElementById('cf_1357578').value;
    let starStatus = iframe.contentWindow.document.getElementById('sf_510_td').innerHTML;

    //let glTransit = iframe.contentWindow.document.getElementById('cf_1354331').innerHTML;
    let glTransit = iframe.contentWindow.document.getElementById('cf_1354331').value;
    let glAccount = iframe.contentWindow.document.getElementById('cf_1354329_div').innerHTML;
    let budgetName = iframe.contentWindow.document.getElementsByClassName('Data1')[0].innerHTML;
    let profile = iframe.contentWindow.document.getElementsByClassName('profile_main')[0].innerHTML;

    let referenceNumber = '';
    let venderEmailAddr ='';
    let requestStatus ='';
    

    // verify record's status
    var statusPatt = /verify payment/i;
    requestStatus = starStatus.match(statusPatt);
    console.log('status:'+requestStatus);

    // extract primary contactor's email address
    var emailPatt = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    venderEmailAddr = profile.match(emailPatt);
    console.log('email:'+venderEmailAddr);

    // extract reference number
    var referencePatt = /[A-Z]{2,5}\d{2,19}/i;
    referenceNumber = profile.match(referencePatt);
    console.log('answer:'+referenceNumber);

    /*
    var contactEmailPatt = /event/i;
    contactEmail = referenceNumber.match(contactEmailPatt);
    console.log(contactEmail);
    if(contactEmail){
        contactEmail ='kathy.mersereau@rbc.com';
    }
    else{
        contactEmail ='ana.mijatovic@rbc.com';
    }
    */
    // donation type in case it is not matched with GL
    let fromType ='';
    let toType ='';

    if(budgetName.indexOf('Corporate Donation')>0){
        if((glTransit ==='07881' || glTransit ==='08689') && glAccount==='9913187')
        {
            glGood = true;
        }
        else{
            glGood = false;
        }
        fromType='Foundation';
        toType='Corporate Donation';
    }else if(budgetName.indexOf('Foundation')>0){
        if(glTransit ==='00011' && glAccount==='9930330')
        {
            glGood = true;
        }
        else{
            glGood = false;
        }
        fromType='Corporate Donation';
        toType='Foundation';
    }
    else{
        //glGood = true;
   }


   if(chequeBank.indexOf('TD')>=0){
       
        if(chequeAccount.length !=7){
            tdChequeGood = false;

            var tdChequeEmail =`
            <a href = "mailto:${venderEmailAddr}?cc=creitsupport@rbc.com&subject=RBC - (${referenceNumber})&body=Hi Team, %0D%0A%0D%0A Many thanks for providing your donation payment transfer details. Upon verifying, we believe there is an error in the entry based on the void cheque.  %0D%0A%0D%0A I will send the file back, can you please go back in to the RBC Social Impact Hub and correct/verify – here is the link https://donations.rbc.com  %0D%0A%0D%0A Upon correction/verifying the account is correct, please save and ‘submit’. %0D%0A%0D%0A The issue is the account number, for TD’s cheque, please enter 7 digits in the system.  %0D%0A%0D%0A Many thanks  for your support,  %0D%0A%0D%0A RBC Social Impact team %0D%0A%0D%0A Thanks %0D%0A%0D%0A CREITSUPPORT">
                <span class="icon" title="send email with template">
                    <i class="fas fa-envelope"></i> Send email to primary contact
                </span>
            </a>
            `;
            alert(tdChequeEmail);
        }
        else{
            
            //alert('found td' + chequeAccount.length);
        }
   }
   else{


   }

   let pageInfo = `
   bank : ${chequeBank}  , <br>
   transit : ${chequeTransit},<br>
   Institution : ${chequeInstitution},<br>
   Account # : ${chequeAccount},<br>
   glTransit : ${glTransit},<br>
   glAccount : ${glAccount},<br>
   budgetName : ${budgetName},<br>
   profile : ${profile}<br>
`;
    // Checking status

    if(statusPatt.test(requestStatus)){
        //alert('Status is correct, if this record is not locked by anyone, then continue the validation process');

        if(glGood===true){
        
            

            alert(`
            
${pageInfo} <br><br>

            <b>Status(Verify Payment) is correct, if this record is locked, skip it, if it is unlocked then continue the validation process</b> <br><br> <strong>budget name & G/L(transit) information are <span style='color:green'>matched</span>, please open the cheque and match the banking information</strong>
            <br> 
            <br>
            <br>
            <span style='color:orange'>User link below to create email for other issue if necessary</span>
            <br>
            <br>
            <a href = "mailto:${venderEmailAddr}?cc=creitsupport@rbc.com&subject=RBC - (${referenceNumber})&body=Hi Team, %0D%0A%0D%0A Many thanks for providing your donation payment transfer details. Upon verifying, we believe there is an error in the entry based on the void cheque.  %0D%0A%0D%0A I will send the file back, can you please go back in to the RBC Social Impact Hub and correct/verify – here is the link https://donations.rbc.com  %0D%0A%0D%0A Upon correction/verifying the account is correct, please save and ‘submit’. %0D%0A%0D%0A The issue is the bank info is not matching the info on the void cheque. Please update.  %0D%0A%0D%0A Many thanks  for your support,  %0D%0A%0D%0A RBC Social Impact team %0D%0A%0D%0A Thanks %0D%0A%0D%0A CREITSUPPORT">
                <span class="icon" title="send email with template">
                    <i class="fas fa-envelope"></i> Send email to primary contact
                </span>
            </a>

            
            `);
        }
        else{
    
            var changeType =` G/L information is not <span sytle='color:red'>match</span><br>
                <a href = "mailto:rbchelp@re-solved.ca?cc=creitsupport@rbc.com&subject=RBC - (${referenceNumber})&body=Hi Team, %0D%0A%0D%0A Can you please change the donation type in the ‘overview’ from ${fromType} to ${toType}. %0D%0A%0D%0A Thanks %0D%0A%0D%0A CREITESUPPORT">
                    <span class="icon" title="send email with template">
                        <i class="fas fa-envelope"></i> Send email to rbchelp@re-solved.ca
                    </span>
                </a>
            `;
    
            alert(changeType);
    
        }
    }
    else{
        alert('Status is not "Verify Payment", skip this one and come back later');
    }

    /*  debug 
    console.log(chequeBank);
    console.log(chequeTransit);
    console.log(chequeInstitution);
    console.log(chequeAccount);
    let result = `
        bank : ${chequeBank}  , 
        transit : ${chequeTransit},
        Institution : ${chequeInstitution},
        Account # : ${chequeAccount},
        glTransit : ${glTransit},
        glAccount : ${glAccount},
        budgetName : ${budgetName},
        profile : ${profile}
    `;

    console.log(profile);
    */
    
}


/*Dom ready*/
$(function(){ 

    var iframe = document.getElementById('app_win');
    let lockmsg = iframe.contentWindow.document.getElementById('lockmsg'); 
    let locked = false;
    locked = (lockmsg)? true : false;
    if(locked){
        alert('Record is locked, skip it for now!!!');
    }
    else{
        ValidationRecord();
    }

});

  
   



//document.addEventListener("DOMContentLoaded", function(event) { });