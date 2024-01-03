<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-users"></i> Inter State Migrant Workers</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item">Inter State Migrant Workers</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="migrantworkers_datatable_container">
    </div>
    <div class="container-fluid" id="migrantworkers_form_container">
    </div>
</section>

<form target="_blank" id="mw_pdf_form" action="migrantworkers/generate_formI_pdf" method="post">
    <input type="hidden" id="mw_id_for_pdf" name="mw_id_for_pdf">
</form>
<form target="_blank" id="mw_certificate_pdf_form" action="migrantworkers/generate_certificate" method="post">
    <input type="hidden" id="mw_id_for_certificate" name="mw_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_migrantworkers" action="migrantworkers/generate_excel" method="post">
</form>