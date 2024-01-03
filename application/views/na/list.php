<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Change In Land Use ( N.A.)</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Change In Land Use ( N.A.)</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="na_datatable_container">
    </div>
    <div class="container-fluid" id="na_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="na_form_pdf_form" action="na/generate_form" method="post">
    <input type="hidden" id="na_id_for_na_form" name="na_id_for_na_form">
</form>
<form target="_blank" id="na_certificate_pdf_form" action="na/generate_certificate" method="post">
    <input type="hidden" id="na_id_for_certificate" name="na_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_na" action="na/generate_excel" method="post">
</form>