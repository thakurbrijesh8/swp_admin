<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-tachometer-alt"></i> Dashboard</h1>
            </div>     
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <?php
            if (is_admin() || is_view_all_district_user() || is_wm_dept_user() || is_pwd_dept_user() || is_tourism_dept_user() || is_sub_register_dept_user() ||
                    is_rev_coll_dept_user() || is_dic_dept_user() || is_dic_dnh_dept_user() || is_pda_dept_user() ||
                    is_labour_dept_user() || is_fb_dept_user() || is_forest_user() || is_arcs_user()) {
                ?>
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="app_count_datatable" class="table table-bordered m-b-0px"
                                       style="margin-top: 0px !important; font-size: 12px;">
                                    <thead>
                                        <tr class="bg-light-gray">
                                            <th class="text-center" style="width: 50px;" rowspan="2">No.</th>
                                            <th class="text-center" style="min-width: 60px;" rowspan="2">District</th>
                                            <th class="text-center" style="min-width: 90px;" rowspan="2">Department Name</th>
                                            <th class="text-center" style="min-width: 140px;" rowspan="2">Service Name</th>
                                            <th class="text-center" style="min-width: 50px;" rowspan="2">Time Line</th>
                                            <th class="text-center" style="width: 90px;" rowspan="2">Total Appli<br>cation</th>
                                            <th class="text-center f-s-16px bg-light-green" style="width: 90px;" colspan="10">Within Time</th>
                                            <th class="text-center f-s-16px bg-light-red" style="width: 90px;" colspan="10">Delayed as per SLA</th>
                                        </tr>
                                        <tr class="bg-light-gray">
                                            <!--<th class="text-center bg-light-green" style="width: 90px;">Draft</th>-->
                                            <th class="text-center bg-light-green" style="width: 90px;">Submi.</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">Que<br>ried</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">Fees<br>Pend.</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">Fees<br>Paid</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">Pay Office</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">Fees N.A.</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">Pay. Confi.</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">Appr.</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">Reje.</th>
                                            <th class="text-center bg-light-green" style="width: 90px;">With.</th>
                                            <!--<th class="text-center bg-light-red" style="width: 90px;">Draft</th>-->
                                            <th class="text-center bg-light-red" style="width: 90px;">Submi.</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">Que<br>ried</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">Fees<br>Pend.</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">Fees<br>Paid</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">Pay Office</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">Fees N.A.</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">Pay. Confi.</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">Appr.</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">Reje.</th>
                                            <th class="text-center bg-light-red" style="width: 90px;">With.</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th>
                                                <input type="text" class="form-control" placeholder="District" maxlength="10" />
                                            </th>
                                            <th>
                                                <input type="text" class="form-control" placeholder="Department Name" maxlength="10" />
                                            </th>
                                            <th>
                                                <input type="text" class="form-control" placeholder="Service Name" maxlength="10" />
                                            </th>
                                            <th></th>
                                            <th></th>
                                            <!--<th class="bg-light-green"></th>-->
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                            <th class="bg-light-green"></th>
                                           <!--<th class="bg-light-red"></th>-->
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                            <th class="bg-light-red"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="app_count_main_container">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
</section>