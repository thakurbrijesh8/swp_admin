<div class="card">
    <div class="card-header">
        <h3 class="card-title float-right">
            <button type="button" class="btn btn-sm btn-primary" onclick="Users.listview.askForNewUsersForm($(this));">Add New User</button>
        </h3>
    </div>
    <div class="card-body" id="users_datatable_container">
        <div class="table-responsive">
            <table id="users_datatable" class="table table-bordered table-hover">
                <thead>
                    <tr class="bg-light-gray">
                        <th class="text-center" style="width: 20px;">No.</th>
                        <th class="text-center" style="min-width: 180px;">Name</th>
                        <th class="text-center" style="min-width: 110px;">Username</th>
                        <th class="text-center" style="width: 160px;">Type</th>
                        <th class="text-center" style="width: 90px;">District</th>
                        <th class="text-center" style="min-width: 110px;">Active / Deactive</th>
                        <th class="text-center" style="width: 50px;">Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>