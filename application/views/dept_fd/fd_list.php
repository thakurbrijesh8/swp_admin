<div class="card-header p-2">
    <h3 class="card-title" style="float: none; text-align: center;">Update Fee Details</h3>
</div>
<div class="card-body text-left f-s-14px">
    <input type="hidden" id="module_type_for_dfdlist" value="{{module_type}}" />
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Department Name <span style="color: red;">*</span></label>
            <input type="text" class="form-control" value="{{department_name}}" readonly="">
        </div>
    </div>
    <div class="row">
        <div class="form-group col-sm-12">
            <label>Service Name <span style="color: red;">*</span></label>
            <textarea class="form-control" readonly="">{{title}}</textarea>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 text-center mb-1">
            <span class="error-message error-message-dfdi f-w-b" style="border-bottom: 2px solid red;"></span>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered table-hover m-b-5px">
            <thead>
                <tr class="bg-light-gray">
                    <th class="text-center" style="width: 30px;">No.</th>
                    <th class="text-center" style="min-width: 250px;">Fee Description</th>
                    <th class="text-center" style="width: 50px;"></th>
                </tr>
            </thead>
            <tbody id="fd_item_container_for_dfdlist_{{module_type}}"></tbody>
        </table>
        <button type="button" class="btn btn-sm btn-nic-blue float-right"
                onclick="DeptFD.listview.addMoreFDI({{module_type}}, {'show_remove_btn': true});">Add More</button>
    </div>
</div>
<div class="card-footer p-2 text-left">
    <button type="button" class="btn btn-sm btn-success" onclick="DeptFD.listview.submitDFDItems($(this));">Submit</button>
    <button type="button" class="btn btn-sm btn-danger" onclick="Swal.close();">Close</button>
</div>