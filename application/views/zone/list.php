<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i>Zone Information 
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Zone Information </li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="zone_datatable_container">
    </div>
    <div class="container-fluid" id="zone_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="zone_form1_pdf_form" action="zone/generate_form1" method="post">
    <input type="hidden" id="zone_id_for_zone_form1" name="zone_id_for_zone_form1">
</form>
<form target="_blank" id="zone_certificate_pdf_form" action="zone/generate_certificate" method="post">
    <input type="hidden" id="zone_id_for_certificate" name="zone_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_zone" action="zone/generate_excel" method="post">
</form>