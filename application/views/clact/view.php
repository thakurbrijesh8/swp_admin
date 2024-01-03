<div class="card">
    <div class="card-header">
        <h3 class="card-title" style="float: none; text-align: center;">FORM - I</h3>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">[See Rule 17(1)]</div>
        <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">APPLICATION FOR REGISTRATION OF ESTABLISHMENTS EMPLOYING CONTRACT LABOUR</div>
    </div>
    <form role="form" id="view_clact_form" name="view_clact_form" onsubmit="return false;">
        <div class="card-body p-b-0px">
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Establishment Registration No. <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" placeholder="Establishment Registration No. !"
                           value="{{registration_number}}" readonly="">
                </div>
                <div class="form-group col-sm-6">
                    <label>Establishment Valid Up to <span style="color: red;">*</span></label>
                    <div class="input-group date">
                        <input type="text" class="form-control" data-date-format="DD-MM-YYYY"placeholder="DD-MM-YYYY"
                               value="{{valid_upto_text}}" readonly="">
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="far fa-calendar"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>1. District <span style="color: red;">*</span></label>
                    <div class="input-group">
                        <select id="district" name="district" class="form-control select2" disabled=""
                                data-placeholder="Select District" style="width: 100%;">  
                        </select>
                    </div>
                    <span class="error-message error-message-clact-district"></span>
                </div>
                <div class="form-group col-sm-6">
                            <label>1.1 Entity / Establishment Type <span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                 <select id="entity_establishment_type" name="entity_establishment_type" class="form-control select2"
                                    data-placeholder="Select Entity / Establishment Type" style="width: 100%;" disabled="">
                            </select>
                            </div>
                        </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>2. Name of the Establishment <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" placeholder="Name of the Establishment !"
                           value="{{establishment_name}}" readonly="">
                </div>
                <div class="form-group col-sm-6">
                    <label>3. Location of the Establishment <span style="color: red;">*</span></label>
                    <textarea  class="form-control"
                               placeholder="Location of the Establishment !" readonly="">{{establishment_location}}</textarea>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>4. Postal Address of the Establishment <span style="color: red;">*</span></label>
                    <textarea class="form-control"
                              placeholder="Postel Address of the Establishment !" readonly="">{{establishment_postel_address}}</textarea>
                </div>
                <div class="col-sm-6 form-group">
                    <label>5. Nature of Work Carried on in the Establishment / Type of Business / Trade / Industry / Manufacture / Occupation <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" placeholder="Nature of Work !"
                           value="{{nature_of_work}}" readonly="">
                </div>
            </div>
            <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Principal Employer Information</h3>
            <hr class="m-b-5px">
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>6. Full Name of the Principal Employer  <span style="color: red;">*</span> (furnish father's name in the case of individuals)</label>
                    <input type="text" class="form-control" placeholder="Principal Employer Full Name !"
                           value="{{pe_full_name}}" readonly="">
                </div>
                <div class="form-group col-sm-6">
                    <label>7. Address of the Principal Employer <span style="color: red;">*</span></label>
                    <textarea class="form-control"
                              placeholder="Address of the Principal Employer !" readonly="">{{pe_address}}</textarea>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>8. Mobile Number of Principal Employer <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" placeholder="Establishment Mobile Number !"
                           value="{{pe_mobile_number}}" readonly="">
                </div>
                <div class="form-group col-sm-6">
                    <label>9. Email of Principal Employer  <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" placeholder="Establishment Email Address !"
                           value="{{pe_email_id}}" readonly="">
                </div>
            </div>
            <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">Manager Information</h3>
            <hr class="m-b-5px">
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>10. Full Name of the Manager or Person responsible for the supervision and control of the establishment <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" placeholder="Full Name of the Manager or Person !"
                           value="{{mp_full_name}}" readonly="">
                </div>
                <div class="form-group col-sm-6">
                    <label>11. Address of the Manager or Person responsible for the supervision and control of the establishment <span style="color: red;">*</span></label>
                    <textarea class="form-control"
                              placeholder="Address of the Manager or Person !" readonly="">{{mp_address}}</textarea>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>12. Mobile Number of the Manager or Person <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" placeholder="Establishment Manager or Person Mobile Number !"
                           value="{{mp_mobile_number}}" readonly="">
                </div>
                <div class="form-group col-sm-6">
                    <label>13. Email of the Manager or Person <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" placeholder="Establishment Manager or Person Email Address !"
                           value="{{mp_email_id}}" readonly="">
                </div>
            </div>
            <h3 class="box-title f-w-b page-header color-nic-blue f-s-20px m-b-0">14. Particular of Contractors and Contract Labour</h3>
            <hr class="m-b-5px">
            <div class="row">
                <div class="col-12 m-b-5px">
                    <div style="background-color: #d2d6de; padding: 3px;">
                        <table class="table table-bordered m-b-0px">
                            <tbody id="contractor_container_for_clact_view">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <hr class="m-b-5px">
            <div class="row">
                <div class="col-12 m-b-5px" id="seal_and_stamp_container_for_clact_view">
                    <label>15. Upload Principal Employer Seal & Stamp <span style="color: red;">* (Maximum File Size: 2MB)</span></label><br>
                    <label class="f-w-n">Document Not Uploaded</label><br>
                </div>
                <div class="form-group col-sm-12" id="seal_and_stamp_name_container_for_clact_view" style="display: none;">
                    <label>15. Principal Employer Seal & Stamp <span style="color: red;">*</label><br>
                    <img id="seal_and_stamp_name_image_for_clact_view" style="width: 250px; height: 250px; border: 2px solid blue;">
                </div>
            </div>
            <hr class="m-b-5px">
            <div class="row">
                <div class="col-12">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" checked="" disabled="">
                        <label class="form-check-label" for="declaration_for_clact">
                            I Hereby Declare that the Particulars Given Above are True to the Best of My Knowledge and Belief.
                        </label>
                    </div>
                </div>
            </div>
            <hr class="m-b-5px">
            <div class="row">
                <div class="form-group col-sm-6">
                    <label>Remarks  <span style="color: red;">*</span></label>
                    <textarea class="form-control" placeholder="Remarks !" readonly="">{{remarks}}</textarea>
                </div>
            </div>
            <hr class="m-b-1rem">
            <div class="form-group">
                <button type="button" class="btn btn-sm btn-danger" onclick="showTableContainer('clact');">Close</button>
            </div>
        </div>
    </form>
</div>