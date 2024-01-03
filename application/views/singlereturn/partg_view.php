<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">PART G</div>
                <div style="font-size: 16px; margin-top: 0px;">Physically Handicapped Person (Employment in Factories) Act, 1982 and rules made there under</div>
                
            </div>
            <form role="form" id="single_return_partg_form" name="single_return_partg_form" onsubmit="return false;">
                <input type="hidden" id="singlereturn_id" name="singlereturn_id" value="{{singlereturn_id}}">
                <input type="hidden" id="singlereturn_partg_id" name="singlereturn_partg_id" value="{{singlereturn_partg_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>1. Total No. of  workers employed<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_employed_workers" name="no_of_employed_workers" class="form-control" placeholder="Enter Total No. of  workers employed !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_employed_workers', noOfEmployedWorkersValidationMessage);" value="{{no_of_employed_workers}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_employed_workers"></span>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>2. Number of physically handicapped persons employed<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="text" id="no_of_handicapped_employed" name="no_of_handicapped_employed" class="form-control" placeholder="Enter Number of physically handicapped persons employed !"
                                       maxlength="100" readonly onblur="checkValidation('single-return', 'no_of_handicapped_employed', noOfHandicappedEmployedValidationMessage);" value="{{no_of_handicapped_employed}}">
                            </div>
                            <span class="error-message error-message-single-return-no_of_handicapped_employed"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>3. Certificate from certifying surgeon obtained from all workers ?<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_surgeon_obtain_yes" name="is_surgeon_obtain" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_surgeon_obtain_no" name="is_surgeon_obtain" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                        <div class="form-group col-sm-6">
                            <label>4. Whether all physically handicapped persons are recuited form Registered Persons with employement exchange<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_handicapped_recuited_yes" name="is_handicapped_recuited" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_handicapped_recuited_no" name="is_handicapped_recuited" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>5. Record of physically handicapped persons maintained in Form No. II Rules -3<span class="color-nic-red">*</span></label>
                            <div class="input-group">
                                <input type="radio" id="is_record_physically_handicapped_yes" name="is_record_physically_handicapped" class="" value="{{VALUE_ONE}}" disabled>&nbsp; Yes
                                &emsp;
                                <input type="radio" id="is_record_physically_handicapped_no" name="is_record_physically_handicapped" class="" style="margin-bottom: 0px;"
                                        value="{{VALUE_TWO}}" disabled>&nbsp;No
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" id="previous_btn_for_partf_details" class="btn btn-sm btn-success" onclick="SingleReturn.listview.editOrViewPartF($('#previous_btn_for_parta_details'), '{{singlereturn_id}}', false);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="SingleReturn.listview.loadSingleReturnData();"  style="margin-right: 5px;">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>