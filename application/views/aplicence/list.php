<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Licence for Contracts Labour</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Licence for Contracts Labour</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="aplicence_datatable_container">
    </div>
    <div class="container-fluid" id="aplicence_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="aplicence_form1_pdf_form" action="aplicence/generate_form1" method="post">
    <input type="hidden" id="aplicence_id_for_aplicence_form1" name="aplicence_id_for_aplicence_form1">
</form>
<form target="_blank" id="aplicence_certificate_pdf_form" action="aplicence/generate_certificate" method="post">
    <input type="hidden" id="aplicence_id_for_certificate" name="aplicence_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_aplicence" action="aplicence/generate_excel" method="post">
</form>