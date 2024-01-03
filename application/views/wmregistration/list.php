<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i>Registration under "Weights & Measure"</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Registration</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="wmregistration_datatable_container">
    </div>
    <div class="container-fluid" id="wmregistration_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="wmregistration_form1_pdf_form" action="wmregistration/generate_form1" method="post">
    <input type="hidden" id="wmregistration_id_for_wmregistration_form1" name="wmregistration_id_for_wmregistration_form1">
</form>
<form target="_blank" id="wmregistration_certificate_pdf_form" action="wmregistration/generate_certificate" method="post">
    <input type="hidden" id="wmregistration_id_for_certificate" name="wmregistration_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_wmregistration" action="wmregistration/generate_excel" method="post">
</form>