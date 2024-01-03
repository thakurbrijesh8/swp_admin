<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Water Connection</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Water Connection</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="wc_datatable_container">
    </div>
    <div class="container-fluid" id="wc_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="wc_form1_pdf_form" action="wc/generate_form1" method="post">
    <input type="hidden" id="wc_id_for_wc_form1" name="wc_id_for_wc_form1">
</form>
<form target="_blank" id="wc_certificate_pdf_form" action="wc/generate_certificate" method="post">
    <input type="hidden" id="wc_id_for_certificate" name="wc_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_wc" action="wc/generate_excel" method="post">
</form>