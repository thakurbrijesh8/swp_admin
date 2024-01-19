<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">ADMINISTRATION OF DADRA & NAGAR HAVELI AND DAMAN & DIU</h3>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DEPARTMENT OF LABOUR</div>
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Shop & Establishment Renewal Form</div>
            </div>
            <form role="form" id="shop_renewal_form" name="shop_renewal_form" onsubmit="return false;">

                <input type="hidden" id="shop_renewal_id" name="shop_renewal_id" value="{{shop_renewal_id}}">
                <input type="hidden" id="shop_id" name="shop_id" value="{{shop_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <span class="error-message error-message-shoprenewal f-w-b" style="border-bottom: 2px solid red;"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            To,<br>
                            Labour Inspector<br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Shop & Establishment License Number<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="registration_number" name="registration_number" class="form-control" placeholder="Enter Shop & Establishment License Number !"
                                       maxlength="100" value="{{registration_number}}" readonly="" onblur="ShopRenewal.listview.getShopData($(this))">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>2. District <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <select id="district" name="district" class="form-control select2" disabled=""
                                        data-placeholder="Select District" style="width: 100%;">  
                                </select>
                            </div>
                            <span class="error-message error-message-cinema-district"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" disabled="">
                            </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Name of Shop & Establishment <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="name_of_shop" name="name_of_shop" class="form-control" placeholder="Name of Shop & Establishment !"
                                       maxlength="100" readonly="" value="{{name_of_shop}}">
                            </div>
                        </div>
                        <div class="col-sm-3 form-group">
                            <label>4. Door No. <span style="color: red;">*</span></label>
                            <input type="text" id="door_no_for_shop" name="door_no_for_shop" class="form-control" placeholder=" Door No. of the Shop/Establishment !"
                                   maxlength="25" disabled="" value="{{door_no}}">
                        </div>
                        <div class="col-sm-3 form-group">
                            <label>5. Street Name <span style="color: red;">*</span></label>
                            <input type="text" id="street_name_for_shop" name="street_name_for_shop" class="form-control" placeholder=" Street Name of the Shop/Establishment !"
                                   maxlength="100" disabled="" value="{{street_name}}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>6. Location of the Shop/Establishment   <span style="color: red;">*</span></label>
                            <textarea id="loaction_for_shop" name="loaction_for_shop" class="form-control" disabled=""
                                      placeholder=" Location of the Shop/Establishment !" maxlength="200">{{location}}</textarea>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>7. Total Number of employees <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" id="total_employees" name="total_employees" class="form-control" placeholder="Total Number of employees !" maxlength="100" value="{{total_employees}}" readonly="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>8. Nature of Business <span style="color: red;">*</span></label>
                            <input type="text" id="nature_of_business_for_shop" name="nature_of_business_for_shop" class="form-control" placeholder=" Nature of Business of Shop/Establishment !"
                                   maxlength="100"   disabled="" value="{{nature_of_business}}">
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Employer Information</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="col-sm-5 form-group">
                            <label>9. Full Name of the Employer(including his Father's Name)<span style="color: red;">*</span></label>
                            <input type="text" id="name_of_employer_for_shop" name="name_of_employer_for_shop" class="form-control" placeholder=" Full Name of the Employer !"
                                   maxlength="100" readonly="" value="{{employer_name}}">
                        </div>
                        <div class="col-sm-3 form-group">
                            <label>10. Mobile No. of the Employer <span style="color: red;">*</span></label>
                            <input type="text" id="mobile_no_employer_for_shop" name="mobile_no_employer_for_shop" class="form-control" placeholder=" Mobile No. of the Employer !"
                                   maxlength="10" readonly="" value="{{employer_mobile_no}}">
                        </div>
                        <div class="col-sm-4 form-group">
                            <label>11. Residential address of the Employer <span style="color: red;">*</span></label>
                            <textarea id="residential_address_employer_for_shop" name="residential_address_employer_for_shop" class="form-control" placeholder=" Residential Address of the Employer !"
                                      maxlength="200" readonly="">{{employer_residential_address}}</textarea>
                        </div>
                    </div>
                    <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Manager Information</h3>
                    <hr class="m-b-5px">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>12. Full Name of the Manager (including his Father's Name) <span style="color: red;">*</span></label>
                            <input type="text" id="manager_name_for_shop" name="manager_name_for_shop" class="form-control" placeholder=" Full Name of Manager !"
                                   maxlength="150" readonly="" value="{{manager_name}}">
                        </div>
                        <div class="form-group col-sm-6">
                            <label>13. Residential Address of the Manager <span style="color: red;">*</span></label>
                            <textarea id="residential_address_manager_for_shop" name="residential_address_manager_for_shop" class="form-control"
                                      readonly="" placeholder=" Residential Address of the Manager !" maxlength="200">{{manager_residential_address}}</textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label>14. Category of establishment i.e, whether a Shop, Commercial Establishment, residential Hotel, restaurant, eating house, theatre, Cinema, or other place or public amusement of entertainment etc. <span style="color: red;">*</span></label>
                            <input type="text" id="category_for_shop" name="category_for_shop" class="form-control" placeholder=" Category of establishment i.e, whether a Shop, Commercial Establishment, residential Hotel, restaurant, eating house, theatre, Cinema, or other place or public amusement of entertainment etc. !"
                                   maxlength="100"  readonly="" value="{{category}}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_shoprenewal">
                            <label>15. Signature<span style="color: red;">* <br>(Maximum File Size: 1MB) &nbsp; (Upload JPG | PNG | JPEG | JFIF Only)</span></label><br>
                            <label class="f-w-n">Document Not Uploaded</label><br>
                            <div class="error-message error-message-shoprenewal-seal_and_stamp_for_shoprenewal"></div>
                        </div>
                        <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_shoprenewal" style="display: none;">
                            <label>15. Principal Employer Seal & Stamp <span style="color: red;">* </label><br>
                            <a target="_blank" id="seal_and_stamp_download"><img id="seal_and_stamp_name_image_for_shoprenewal" style="width: 250px; height: 250px; border: 2px solid blue;"></a>
                        </div>
                    </div>
                    <hr class="m-b-1rem">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Remarks  <span style="color: red;">*</span></label>
                            <textarea class="form-control" placeholder="Remarks !" readonly="">{{remarks}}</textarea>
                        </div>
                    </div>
                    <hr class="m-b-1rem"> 
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="ShopRenewal.listview.loadShopRenewalData();"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>