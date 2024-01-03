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
                            <input type="checkbox" id="partf_form" name="partf_form" class="checkbox" value="{{VALUE_ONE}}">&nbsp;(F) INTEREST SUBSIDY FOR TEXTILE SECTOR
                            <span class="error-message error-message-scheme-partf_form"></span>
                        </div>
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="partg_form" name="partg_form" class="checkbox" value="{{VALUE_ONE}}">&nbsp;(G) INTEREST SUBSIDY IN TECHNICAL TEXTILE
                            <span class="error-message error-message-scheme-partg_form"></span>
                        </div>
                        <div class="form-group col-sm-12">
                            <input type="checkbox" id="parth_form" name="parth_form" class="checkbox" value="{{VALUE_ONE}}">&nbsp;(H) ASSISTANCE FOR TECHNOLOGY UPGRADATION
                            <span class="error-message error-message-scheme-parth_form"></span>
                        </div>
                    </div>
                    
                    
                    <div class="form-group">
                        <button type="button" class="btn btn-sm btn-danger" onclick="Textile.listview.loadTextileData();">Cancel</button>
                        <button type="button" id="submit_btn_for_scheme_details" class="btn btn-sm btn-success pull-right" onclick="Textile.listview.submitSchemeDetails({{VALUE_ONE}});" style="margin-right: 5px;">Next <span class="fas fa-hand-point-right"></span></button>
                        <button type="button" id="previous_btn_for_incentive_details" class="btn btn-sm btn-success pull-right" onclick="Textile.listview.editOrViewTextile($('#previous_btn_for_scheme_details'), '{{incentive_id}}', true);" style="margin-right: 5px;"><span class="fas fa-hand-point-left"></span> Previous</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>