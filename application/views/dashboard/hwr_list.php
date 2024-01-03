<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-heading"></i> Head Wise Report</h1>
            </div>     
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid">
        <div class="card">
            <div class="card-body pb-0">
                <input type="hidden" id="h_from_date_for_hwr" class="h_field_for_hwr" value="" />
                <input type="hidden" id="h_to_date_for_hwr" class="h_field_for_hwr" value="" />
                <form role="form" id="hwr_form" name="hwr_form" onsubmit="return false;">
                    <div class="row">
                        <div class="form-group col-6 col-sm-4 col-md-2">
                            <label>From Date</label>
                            <div class="input-group date">
                                <input type="text" id="from_date_for_hwr" name="from_date_for_hwr" 
                                       class="form-control date_picker" data-date-format="DD-MM-YYYY" placeholder="DD-MM-YYYY">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-6 col-sm-4 col-md-2">
                            <label>To Date</label>
                            <div class="input-group date">
                                <input type="text" id="to_date_for_hwr" name="to_date_for_hwr" 
                                       class="form-control date_picker" data-date-format="DD-MM-YYYY" placeholder="DD-MM-YYYY">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="far fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-sm-4 col-md-2">
                            <label>&nbsp;</label>
                            <button type="button" id="search_btn_for_hwr" class="btn btn-sm btn-nic-blue d-block"
                                    onclick="Dashboard.listview.searchHWR($(this));">
                                <i class="fas fa-search"></i> &nbsp; Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card">
            <div class="card-body" id="hwr_datatable_container_for_hwr"></div>
        </div>
    </div>
</section>