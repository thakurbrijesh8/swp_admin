<div class="row">
    <!--  <div class="col-sm-12"></div> -->
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header">
                <div style="font-size: 16px; text-align: center; margin-top: 0px;font-weight: bold;">Investment Promotion Scheme </div>
            </div>
            <form role="form" id="scheme_form" name="scheme_form" onsubmit="return false;">
                <input type="hidden" id="incentive_scheme_id" name="incentive_scheme_id" value="{{incentive_scheme_id}}">
                <input type="hidden" id="incentive_id" name="incentive_id" value="{{incentive_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="parta_form" name="parta_form" class="checkbox" value="{{VALUE_ONE}}">&nbsp;(A) CAPITAL INVESTMENT / INTEREST SUBSIDY
                            <span class="error-message error-message-scheme-parta_form"></span>
                        </div>
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="partb_form" name="partb_form" class="checkbox" value="{{VALUE_ONE}}">&nbsp;(B) ASSISTANCE FOR QUALITY CERTIFICATION
                            <span class="error-message error-message-scheme-partb_form"></span>
                        </div>
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="partc_form" name="partc_form" class="checkbox" value="{{VALUE_ONE}}">&nbsp;(C) ASSISTANCE FOR PATENT REGISTRATION
                            <span class="error-message error-message-scheme-partc_form"></span>
                        </div>
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="partd_form" name="partd_form" class="checkbox" value="{{VALUE_ONE}}">&nbsp;(D) ASSISTANCE FOR SAVING IN CONSUMPTION OF ENERGY AND WATER
                            <span class="error-message error-message-scheme-partd_form"></span>
                        </div>
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="parte_form" name="parte_form" class="checkbox" value="{{VALUE_ONE}}">&nbsp;(E) INCENTIVES FOR LOCAL EMPLOYMENT
                            <span class="error-message error-message-scheme-parte_form"></span>
                        </div>
                    </div>
                    
                    
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="MSME.listview.loadMSMEData();">Cancel</button>
                        <button type="button" id="submit_btn_for_scheme_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.submitSchemeDetails({{VALUE_ONE}});" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="MSME.listview.editOrViewMSME($('#previous_btn_for_scheme_details'), '{{incentive_id}}', true);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>