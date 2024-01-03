<div class="card">
    <div class="card-header">
        <h3 class="card-title float-right">
            <button type="button" class="btn btn-sm btn-primary" onclick="CInspections.listview.newCInspectionsForm(false, {});">Add New Inspection</button>
        </h3>
    </div>
    <div class="card-body" id="users_datatable_container">
        <div class="table-responsive">
            <table id="ci_datatable" class="table table-bordered table-hover">
                <thead>
                    <tr class="bg-light-gray">
                        <th class="text-center" style="width: 20px;">No.</th>
                        <th class="text-center" style="min-width: 80px;">Inspection Date</th>
                        <th class="text-center" style="min-width: 400px;">Inspection Under Act - Inspector</th>
                        <th class="text-center" style="min-width: 100px;">Company / Business Type</th>
                        <th class="text-center" style="min-width: 140px">Company / Business Name</th>
                        <th class="text-center" style="min-width: 140px;">Company / Business Address</th>
                        <th class="text-center" style="min-width: 80px;">Inspection / Randomi. / Lock-Unlock</th>
                        <th class="text-center" style="min-width: 160px;">Action</th>
                    </tr>
                    <tr>
                        <th colspan="3"></th>
                        <th>
                            <select id="cb_type_for_ci_list" class="form-control"
                                    data-placeholder="Company / Business Type !">
                                <option value="">All</option>
                            </select>
                        </th>
                        <th>
                            <input type="text" class="form-control" placeholder="Company / Business Name" />
                        </th>
                        <th>
                            <input type="text" class="form-control" placeholder="Company / Business Address" />
                        </th>
<!--                        <th>
                            <select id="status_for_ci_list" class="form-control"
                                    data-placeholder="Status !">
                                <option value="">All</option>
                            </select>
                        </th>-->
                        <th colspan="2"></th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>