<div id="query_container">
    <input type="hidden" id="query_id_for_query" value="{{query_id}}" />
    <input type="hidden" id="module_type_for_query" value="{{module_type}}" />
    <input type="hidden" id="module_id_for_query" value="{{module_id}}" />
    <input type="hidden" id="query_type_for_query" value="{{query_type}}" />
    <i class="fas fa-question bg-red"></i>
    <div class="timeline-item">
        <span class="time color-nic-black"><i class="fas fa-clock"></i> Query Date Time : <span id="query_time_for_query" class="color-nic-red">{{datetime_text}}</span></span>
        <h3 class="timeline-header"><a class="color-nic-red" href="Javascript:void(0);">Query</a></h3>
        <div class="timeline-body p-b-0px">
            <div class="row">
                <div class="form-group col-sm-12 col-md-4">
                    <label>Remarks <span style="color: red;">*</span></label>
                    <textarea id="remarks_for_query" class="form-control" placeholder="Remarks !"
                              onblur="checkValidation('query', 'remarks_for_query', remarksValidationMessage);"
                              rows="4">{{remarks}}</textarea>
                    <span class="error-message error-message-query-remarks_for_query"></span>
                </div>
                <div class="col-sm-12 col-md-8">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr class="bg-light-gray">
                                            <th class="text-center" style="width: 40px;">No.</th>
                                            <th class="text-center" style="min-width: 280px;">Document Name</th>
                                            <th class="text-center" style="min-width: 250px;">Document</th>
                                            <th class="text-center" style="width: 75px;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="document_item_container_for_query"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="button" class="btn btn-success btn-sm pull-right"
                                    onclick="addDocumentRow({});">Add More Documents</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="timeline-footer" style="padding-top: 0px;">
            <a class="btn btn-success btn-sm" id="submit_btn_for_query"
               onclick="askForSubmitQueryDetails();"><i class="fas fa-save"></i> Submit</a>
        </div>
    </div>
</div>