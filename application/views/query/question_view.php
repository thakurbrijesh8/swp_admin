{{#if show_extra_div}}
<div>
    {{/if}}
    <i class="fas fa-question bg-red"></i>
    <div class="timeline-item">
        <span class="time color-nic-black"><i class="fas fa-clock"></i> Query Date Time : <span class="color-nic-red">{{datetime_text}}</span></span>
        <h3 class="timeline-header"><a class="color-nic-red" href="Javascript:void(0);">Query</a></h3>
        <div class="timeline-body p-b-0px">
            <div class="row">
                {{#if show_document_container}}
                <div class="form-group col-sm-12 col-md-4">
                    {{else}}    
                    <div class="form-group col-sm-12">
                        {{/if}}
                        <label>Remarks <span style="color: red;">*</span></label>
                        <div class="box-new textarea-new">{{remarks}}</div>
                    </div>
                    {{#if show_document_container}}
                    <div class="col-sm-12 col-md-8">
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                            <tr class="bg-light-gray">
                                                <th class="text-center" style="width: 30px;">No.</th>
                                                <th class="text-center" style="min-width: 165px;">Document Name</th>
                                                <th class="text-center" style="min-width: 165px;">Document</th>
                                            </tr>
                                        </thead>
                                        <tbody id="document_item_container_for_query_view_{{cnt}}"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{/if}}
                </div>
            </div>
        </div>
        {{#if show_extra_div}}
    </div>
    {{/if}}