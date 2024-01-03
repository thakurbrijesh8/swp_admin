<div class="card">
    <div class="card-header">
        <h3 class="card-title float-right">
            <button type="button" class="btn btn-sm btn-primary" onclick="Officer.listview.askForNewOfficerForm($(this));">Add New Inspection Officer</button>
        </h3>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table id="officer_datatable" class="table table-bordered table-hover">
                <thead>
                    <tr class="bg-light-gray">
                        <th class="text-center" style="width: 20px;">No.</th>
                        <th class="text-center" style="min-width: 150px;">Department Name</th>
                        <th class="text-center" style="min-width: 150px;">Officer Name</th>
                        <th class="text-center" style="min-width: 110px;">Mobile Number</th>
                        <th class="text-center" style="min-width: 110px;">Email Address</th>
                        <th class="text-center" style="min-width: 110px;">Active / Deactive</th>
                        <th class="text-center" style="width: 50px;">Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>