<div class="row">
    <div class="col-sm-1 col-md-2"></div>
    <div class="col-sm-10 col-md-8">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" style="float: none; text-align: center;">{{#if show_edit}}Upload{{else}}View{{/if}} Inspection Report </h3>
            </div>
            <form role="form" id="uir_sji_form" name="uir_sji_form" onsubmit="return false;">
                <input type="hidden" id="sj_inspection_id_for_uir_sji" name="sj_inspection_id_for_uir_sji" value="{{sj_inspection_id}}">
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label>Inspection Date <span style="color: red;">*</span></label>
                            <div class="input-group">
                                <input type="text" class= "form-control" placeholder="dd-mm-yyyy"
                                       value="{{inspection_date}}" readonly="">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-12">
                            <label>Remarks</label>
                            <textarea class="form-control" id="ir_remarks_for_uir_sji" name="ir_remarks_for_uir_sji"
                                      placeholder="Enter Remarks !" maxlength="200">{{ir_remarks}}</textarea>
                            <span class="error-message error-message-uir-sji-ir_remarks_for_uir_sji"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 m-b-5px" id="inspection_report_container_for_uir_sji">
                            <label>Upload Inspection Report <span style="color: red;">* (Maximum File Size: 5MB)</span></label><br>
                            <input type="file" id="inspection_report_for_uir_sji" name="inspection_report_for_uir_sji">
                            <div class="error-message error-message-uir-sji-inspection_report_for_uir_sji"></div>
                        </div>
                        <div class="form-group col-12 m-b-5px" id="inspection_report_name_container_for_uir_sji" style="display: none;">
                            <label>Upload Inspection Report <span style="color: red;">*</span></label><br>
                            <a id="inspection_report_name_href_for_uir_sji" target="_blank">
                                <i class="fas fa-cloud-download-alt" style="margin-right: 3px;"></i><span id="inspection_report_name_for_uir_sji"></span>
                            </a>
                            {{#if show_btns}}
                            <span class="fas fa-times" style="color: red; cursor: pointer; margin-left: 3px;" id="inspection_report_remove_btn_for_uir_sji"></span><br>
                            {{/if}}
                            <span class="error-message error-message-uir-sji-inspection_report_name_for_uir_sji"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            {{#if show_btns}}
                            <button type="button" id="draft_btn_for_uir_sji" class="btn btn-sm btn-nic-blue" onclick="SJInspections.listview.uploadReport({{VALUE_TWO}});" style="margin-right: 5px;">Save as a Draft</button>
                            <button type="button" id="submit_btn_for_uir_sji" class="btn btn-sm btn-success" onclick="SJInspections.listview.askForUploadReport({{VALUE_THREE}});" style="margin-right: 5px;">Submit Application</button>
                            {{/if}}
                            <button type="button" class="btn btn-sm btn-danger" onclick="SJInspections.listview.loadSJInspectionsData();">Back</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>