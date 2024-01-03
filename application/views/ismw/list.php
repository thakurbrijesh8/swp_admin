<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> I.S.M.W Returnees</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">I.S.M.W Returnees</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="ismw_datatable_container">
    </div>
    <div class="container-fluid" id="ismw_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="ismw_form_pdf_form" action="ismw/generate_form" method="post">
    <input type="hidden" id="ismw_id_for_ismw_form" name="ismw_id_for_ismw_form">
</form>
<form target="_blank" id="ismw_certificate_pdf_form" action="ismw/generate_certificate" method="post">
    <input type="hidden" id="ismw_id_for_certificate" name="ismw_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_ismw" action="ismw/generate_excel" method="post">
</form>