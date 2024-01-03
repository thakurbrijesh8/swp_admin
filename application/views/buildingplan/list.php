<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Approval of plan and permission to construct/extend/or take into use any building as a factory under the Factories Act, 1948</h1>
            </div>
            <div class="col-sm-12">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Factory Building Plan Approval</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid" id="building_plan_form_and_datatable_container">
</div>
<form target="_blank" id="buildingplan_form1_pdf_form" action="buildingplan/generate_form1" method="post">
    <input type="hidden" id="buildingplan_id_for_buildingplan_form1" name="buildingplan_id_for_buildingplan_form1">
</form>
<form target="_blank" id="buildingplan_certificate_pdf_form" action="buildingplan/generate_certificate" method="post">
    <input type="hidden" id="buildingplan_id_for_certificate" name="buildingplan_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_buildingplan" action="buildingplan/generate_excel" method="post">
</form>