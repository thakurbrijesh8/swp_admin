<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-9">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Registration of license under The Factories Act, 1948</h1>
            </div>
            <div class="col-sm-12">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Factories License</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid" id="factory_license_form_and_datatable_container">
</div>
<form target="_blank" id="factorylicense_form1_pdf_form" action="factorylicense/generate_form1" method="post">
    <input type="hidden" id="factorylicense_id_for_factorylicense_form1" name="factorylicense_id_for_factorylicense_form1">
</form>
<form target="_blank" id="factorylicense_certificate_pdf_form" action="factorylicense/generate_certificate" method="post">
    <input type="hidden" id="factorylicense_id_for_certificate" name="factorylicense_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_factory_license" action="factorylicense/generate_excel" method="post">
</form>