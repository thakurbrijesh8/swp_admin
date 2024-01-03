<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="m-0 text-dark"><i class="nav-icon fas fa-file-signature"></i> List of Establishment is Registered Under Contract Labour ACT</h1>
            </div>
            <div class="col-sm-12">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#home">Home</a></li>
                    <li class="breadcrumb-item active">Establishment</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="clact_datatable_container">
    </div>
    <div class="container-fluid" id="clact_form_container">
    </div>
</section>
<form target="_blank" id="establishment_form1_pdf_form" action="clact/generate_form1" method="post">
    <input type="hidden" id="establishment_id_for_clact_form1" name="establishment_id_for_clact_form1">
</form>
<form target="_blank" id="establishment_certificate_pdf_form" action="clact/generate_certificate" method="post">
    <input type="hidden" id="establishment_id_for_certificate" name="establishment_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_clact" action="clact/generate_excel" method="post">
</form>