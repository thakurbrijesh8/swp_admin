<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <!-- <h3 class="card-title" style="float: none; text-align: center;">Weight and Measure Form </h3> -->
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Application format for Manufacturer/Packer/Importer, <br>Registration as per Rule Standard of Weight and Measures (P.C) <br> Rule,2011 U/s. 27</div>
            </div>
            <form role="form" id="periodicalreturn_form" name="periodicalreturn_form" onsubmit="return false;">

                <input type="hidden" id="periodicalreturn_id" name="periodicalreturn_id" value="{{periodicalreturn_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To<br>
                            The Assistant Controller,<br>
                            Department of Legal Metrology,<br>
                            (Weights & Measures)<br>
                            Daman & Diu,
                        </div>
                    </div>
                       <div class="row">
                      <div class="form-group col-sm-6">
                            <label>1. District <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2"
                                    data-placeholder="Select District" style="width: 100%;" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-zone-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" onblur="checkValidation('periodicalreturn', 'entity_establishment_type', entityEstablishmentTypeValidationMessage);" disabled="">
                            </select>
                            </div>
                            <span class="error-message error-message-periodicalreturn-entity_establishment_type"></span>
                        </div>
                    </div>
                       <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. Select type of Application<span class="color-nic-red">*</span></label>
                             <div class="input-group">
                                <select class="form-control select2" id="application_category" name="application_category"  onchange="Periodicalreturn.listview.getApplicanttype(this);"
                                        data-placeholder="Type Of Application !"   onblur="checkValidation('periodicalreturn', 'application_category', selectApplicationValidationMessage);" disabled="" >
                                    <option value="">Select type of Application</option>
                                    <option value="1">LR 4</option>
                                    <option value="2">LD 4</option>
                                    <option value="3">LM 4</option>
                                </select>
                            </div>
                            <span class="error-message error-message-periodicalreturn-application_category"></span>
                        </div></br>  
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="applicant_detail_for_lr_div">3. Full Name of Repairer <span class="color-nic-red">*</span></label>

                            <label class="applicant_detail_for_ld_div" style="display: none">3. Full Name of Dealer <span class="color-nic-red">*</span></label>

                            <label class="applicant_detail_for_lm_div" style="display: none">3. Full Name of Manufacturer<span class="color-nic-red">*</span></label>

                            <div class="input-group">
                                <input type="text" id="name_of_applicant" name="name_of_applicant" class="form-control" placeholder="Enter Name of Applicant !" 
                                       maxlength="100"  value="{{name_of_applicant}}" disabled="">
                            </div>
                            <span class="error-message error-message-periodicalreturn-name_of_applicant"></span>
                        </div>
                         <div class="form-group col-sm-6">

                            <label class="applicant_detail_for_lr_div">4. Address of the Repairer <span class="color-nic-red">*</span></label>

                            <label class="applicant_detail_for_ld_div" style="display: none">4. Address of the Dealer <span class="color-nic-red">*</span></label>

                            <label class="applicant_detail_for_lm_div" style="display: none">4. Address of the Manufacturer<span class="color-nic-red">*</span></label>


                            <div class="input-group">
                                <input type="text" id="applicant_address" name="applicant_address" class="form-control" placeholder="Enter Address of the Applicant !" 
                                       maxlength="100"  value="{{applicant_address}}" disabled="">
                            </div>
                            <span class="error-message error-message-periodicalreturn-applicant_address"></span>
                     </div>                       
                    </div>

                <div class="row">
                        <div class="form-group col-sm-6">

                             <label class="applicant_detail_for_lr_div">5. Repairer Licence No <span class="color-nic-red">*</span></label>

                            <label class="applicant_detail_for_ld_div" style="display: none">5.  Dealer Licence No <span class="color-nic-red">*</span></label>

                            <label class="applicant_detail_for_lm_div" style="display: none">5.  Manufacturer Licence No<span class="color-nic-red">*</span></label>

                            <div class="input-group">
                                <input type="text" id="applicant_licence_no" name="applicant_licence_no" class="form-control" placeholder="Enter Licence No !" 
                                       maxlength="100"  value="{{applicant_licence_no}}" disabled="">
                            </div>
                            <span class="error-message error-message-periodicalreturn-applicant_licence_no"></span>
                        </div>
                        <div class="form-group col-sm-6">
                             <label class="applicant_detail_for_lr_div">6. Date of Licensing <span class="color-nic-red">*</span></label>

                            <label class="applicant_detail_for_ld_div" style="display: none">6.  Date on which the licence was issued  <span class="color-nic-red">*</span></label>

                            <label class="applicant_detail_for_lm_div" style="display: none">6.   Date on which the licence was issued<span class="color-nic-red">*</span></label>
                            <div class="input-group date">
                                <input type="text" name="applicant_licence_date" id="applicant_licence_date" class="form-control date_picker" placeholder="dd-mm-yyyy" data-date-format="DD-MM-YYYY"
                                       value="{{applicant_licence_date}}" onblur="checkValidation('periodicalreturn', 'applicant_licence_date', licenceDateValidationMessage);" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                            <span class="error-message error-message-periodicalreturn-applicant_licence_date"></span>
                        </div>
                    </div>

                      <!--  <div class="row"> -->
                        <div class="row applicant_ld_lm_div" style="display: none">
                        <div class="form-group col-sm-6">
                            <label>7. Description of the Weight or Measure<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="description_wm" name="description_wm" class="form-control" placeholder="Enter Description of the Weight or Measure !" 
                                       maxlength="100"  value="{{description_wm}}" disabled="">
                            </div>
                            <span class="error-message error-message-periodicalreturn-description_wm"></span>
                        </div>
                         <div class="form-group col-sm-6">
                            <label>8. Period of Validity of Licence<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="period_validity_licence" name="period_validity_licence" class="form-control" placeholder="Enter Period of Validity of Licence !" 
                                       maxlength="100"  value="{{period_validity_licence}}" disabled="">
                            </div>
                            <span class="error-message error-message-periodicalreturn-period_validity_licence"></span>
                     </div>                       
                    </div>
   
               <div class="row applicant_ld_lm_div" style="display: none">
                        <div class="form-group col-sm-6">
                            <label>9. Particulars of order, if any suspending or Revoking the Licence<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="suspending_revoke" name="suspending_revoke" class="form-control" placeholder="Enter Revoking the Licence !" 
                                       maxlength="100"  value="{{suspending_revoke}}" disabled="">
                            </div>
                            <span class="error-message error-message-periodicalreturn-suspending_revoke"></span>
                        </div>
                    </div>

                <div class="row applicant_ld_div" style="display: none">                    
                         <div class="form-group col-sm-6">
                            <label>10. Category of Weight or Measure (Category A or B)<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="category_of_wm" name="category_of_wm" class="form-control" placeholder="Enter Category of Weight or Measure !" 
                                       maxlength="100"  value="{{category_of_wm}}" disabled="">
                            </div>
                            <span class="error-message error-message-periodicalreturn-category_of_wm"></span>
                     </div>                       
                    </div>

                <div class="col-xs-12 applicant_lr_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">7. Details of Repairer</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="repairerList" style="margin-top: 10px;">
                                <thead>

                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Date</th>
                                        <th>Name of the user from whom received</th>
                                        <th>Items and their Nos. booked for repair</th>
                                        <th>Receipt No. and date of issue to the user</th>
                                        <th>Amount of repairing charges</th>
                                         <th>Amount of verification fee</th>
                                        <th>No. of items sold   </th>
                                        <th>Total amount charged </th>
                                        <th>Date of return to the user</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody id="repairer_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product_manufacturer" onclick="Periodicalreturn.listview.addMultipleRepairer({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;" disabled></i>Add Details
                            </button>
                        </div>
                </div>
          
                <div class="col-xs-12 applicant_ld_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">11. Details of Dealer</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="proprietorList" style="margin-top: 10px;">
                                <thead>

                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Month</th>
                                        <th>Unsold stock from the previous month</th>
                                        <th>Brought from within the U.T. of Daman & Diu during the month</th>
                                        <th>Brought from outside the U.T. of Daman & Diu. During the month</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="proprietor_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product" onclick="Periodicalreturn.listview.addMultipleProprietor({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Details
                            </button>
                        </div>
                    </div>
                    <br/>
                    <br/>

             
                
                <div class="col-xs-12 applicant_ld_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">11. Details of Dealer</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="otherList" style="margin-top: 10px;">
                                <thead>

                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>No. of items sold</th>
                                        <th>Dispatch voucher no, and date</th>
                                        <th>No. of items sold</th>
                                        <th>Dispatch voucher No, and date</th>
                                        <th>Name of the State</th>
                                        <th>Total sold</th>
                                        <th>Balance</th>
                                        <th>Remarks</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="other_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product_detail" onclick="Periodicalreturn.listview.addOther({});" style="margin-right: 5px;margin-top: 5px;" disabled><i class="fas fa-plus-circle" style="margin-right: 5px;"></i>Add Details
                            </button>
                        </div>
                </div>


                <div class="col-xs-12 applicant_lm_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">10. Details of Manufacturer</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="manufacturerList" style="margin-top: 10px;">
                                <thead>

                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Month</th>
                                        <th>Unsold stock from previous month</th>
                                        <th>Quantity manufactured during the month</th>
                                        <th>Total</th>
                                        <th>No of item sold</th>
                                        <th>Dispatch voucher no. and date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="manufacturer_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product_manufacturer" onclick="Periodicalreturn.listview.addMultipleManufacturer({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;" disabled></i>Add Details
                            </button>
                        </div>
                    </div>
                    <br/>
                    <br/>

                <div class="col-xs-12 applicant_lm_div" style="display: none">
                        <div style="background-color: #d2d6de; padding: 5px;">
                            <span class="f-w-b" style="font-size: 15px; color: #000;">10. Details of Manufacturer</span>
                            <hr>
                            <table class="table table-bordered m-b-0px" id="manufacturertwoList" style="margin-top: 10px;">
                                <thead>

                                    <tr style='color: #000;'>
                                        <th style="width: 10px">Sr.No.</th>
                                        <th>Name of the state</th>
                                        <th>No. of items sold   </th>
                                        <th>Dispatch voucher no. and date </th>
                                        <th>Total sold</th>
                                        <th>Balance</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody id="manufacturertwo_info_container">
                                </tbody>
                            </table>
                        </div>
                        <div class="box-footer" align="right" >
                            <button type="button" class="btn btn-sm btn-nic-blue float-right" id="submit_btn_for_principle_product_manufacturer" onclick="Periodicalreturn.listview.addMultipleManufacturertwo({});" style="margin-right: 5px;margin-top: 5px;"><i class="fas fa-plus-circle" style="margin-right: 5px;" disabled></i>Add Details
                            </button>
                        </div>
                    </div>

                     <hr class="m-b-1rem">

                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('periodicalreturn');">Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>