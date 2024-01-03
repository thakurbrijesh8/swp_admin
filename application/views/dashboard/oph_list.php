<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-rupee-sign"></i> Online Payment History</h1>
            </div>     
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table id="oph_datatable" class="table table-bordered m-b-0px table-hover f-s-14px"
                                   style="margin-top: 0px !important;">
                                <thead>
                                    <tr class="bg-light-gray">
                                        <th class="text-center" style="width: 35px;">No.</th>
                                        <th class="text-center" style="min-width: 80px;">District</th>
                                        <th class="text-center" style="min-width: 120px;">Department Name</th>
                                        <th class="text-center" style="min-width: 180px;">Service Name</th>
                                        <th class="text-center" style="min-width: 80px;">Application Number</th>
                                        <th class="text-center" style="min-width: 80px;">Transaction<br>Date & Time</th>
                                        <th class="text-center" style="min-width: 80px;">Total Fees</th>
                                        <th class="text-center" style="min-width: 120px;">Payment<br>Reference Number</th>
                                        <th class="text-center" style="min-width: 120px;">Payment Status</th>
                                        <th class="text-center" style="min-width: 150px;">Message</th>
                                        <th class="text-center" style="min-width: 80px;">Action</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>
                                            <?php if (is_admin() || is_view_all_district_user()) { ?>
                                                <select id="district_for_oph_list" class="form-control"
                                                        data-placeholder="District !">
                                                    <option value="">All</option>
                                                </select>
                                            <?php } ?>
                                        </th>
                                        <th>
                                            <?php if (is_admin() || is_view_all_district_user()) { ?>
                                                <select id="dept_name_for_oph_list" class="form-control"
                                                        data-placeholder="Department Name !">
                                                    <option value="">All</option>
                                                </select>
                                            <?php } ?>
                                        </th>
                                        <th colspan="4"></th>
                                        <th>
                                            <input type="text" class="form-control text-center" placeholder="Payment Reference Number" maxlength="20" />
                                        </th>
                                        <th>
                                            <select id="pg_status_for_oph_list" class="form-control"
                                                    data-placeholder="Payment Status !">
                                                <option value="">All</option>
                                            </select>
                                        </th>
                                        <th colspan="2"></th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>