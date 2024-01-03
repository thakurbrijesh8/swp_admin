<div class="row">
    <div class="col-sm-6 col-md-3 m-b-5px">
        <label class="m-b-0px"><i class="fas fa-calendar-alt"></i> Application Number</label><br>
        <span>{{application_number}}</span>
    </div>
    <div class="col-sm-6 col-md-3 m-b-5px">
        <label class="m-b-0px"><i class="fas fa-file-signature"></i> {{title}}</label><br>
        <span>{{applicant_name}}</span>
    </div>
    <div class="col-sm-12 col-md-6 m-b-5px">
        {{#if show_raise_query_btn}}
        <button type="button" class="btn btn-sm btn-danger" id="raise_query_btn_for_query"
                onclick="raiseAnotherQuery({{module_type}},{{module_id}})" style="cursor: pointer;">
            <i class="fas fa-plus"></i> &nbsp; Raise Another Query
        </button>
        {{/if}}
        {{#if show_resolve_query_btn}}
        <button type="button" class="btn btn-sm btn-success" id="resolved_btn_for_query"
                onclick="askForResolvedQuery({{module_type}},{{module_id}})" style="cursor: pointer;">
            <i class="fas fa-check"></i> &nbsp; Click here if Query is Resolved
        </button>
        {{/if}}
    </div>
</div>
<div class="row" style="background-color: #f4f6f9;">
    <div class="col-md-12" style="padding-top: 7.5px;">
        <!-- The time line -->
        <div class="timeline" id="query_item_container">
            <div>
                <i class="fas fa-clock bg-gray"></i>
            </div>
        </div>
    </div>
</div>