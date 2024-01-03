<div class="row">
   <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">DECLARATION </div>
                
            </div>
            <form role="form" id="declaration_form" name="declaration_form" onsubmit="return false;">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <input type="hidden" id="declaration_id" name="declaration_id" value="{{declaration_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-12">
                            I/We hereby declare that all the information given above and the statements and other documents enclosed are to the best of my/our knowledge and belief, true and correct.
                            <br><br>
                            I / We hereby agree that, I / We shall forthwith repay the Capital Subsidy / Special Capital Subsidy for Thrust sector enterprises / Employment Intensive Subsidy / Additional Capital Subsidy for select category of entrepreneurs / Additional Capital Subsidy for promotion of Cleaner and Environment friendly technologies disbursed to the unit, if the amount of subsidy is found to have been disbursed in excess of the amount actually admissible for whatever reason. Further I/We also shall be liable to pay interest at such rate as prescribed by the Government from time to time on such amounts and such other changes / expenses which may be repayable by us.
                            <br><br>
                            It is further certified that I / We have not hitherto applied for or have received any amount by way of grant / subsidy in respect of this Enterprise from Government / Financial institution.
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="sign_seal_container_for_msme">
                            <label>Upload Authorized Signatory Designation with Seal<span style="color: red;">* (Maximum File Size: 1MB)</span></label><br>
                            <input type="file" id="sign_seal_for_msme" name="sign_seal_for_msme"
                                   accept="image/jpg,image/png,image/jpeg,image/jfif">
                            <div class="error-message error-message-msme-sign_seal_for_msme"></div>
                        </div>
                        <div class="form-group col-sm-12" id="sign_seal_name_container_for_msme" style="display: none;">
                            <label>Authorized Signatory Designation with Seal <span style="color: red;">*</label><br>
                            <img id="sign_seal_name_image_for_msme" style="width: 250px; height: 250px; border: 2px solid blue;">
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button>
                        <button type="button" id="submit_btn_for_declaration_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewChecklist($('#previous_btn_for_checklist_details'), '{{incentive_id}}', false);" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewForms($('#previous_btn_for_parte_details'), '{{incentive_id}}', true, 'declaration_form');" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>