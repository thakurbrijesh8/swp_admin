<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> NOC for Mortgage</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">NOC for Mortgage</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="noc_datatable_container">
    </div>
    <div class="container-fluid" id="noc_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="noc_form1_pdf_form" action="noc/generate_form1" method="post">
    <input type="hidden" id="noc_id_for_noc_form1" name="noc_id_for_noc_form1">
</form>
<form target="_blank" id="noc_certificate_pdf_form" action="noc/generate_certificate" method="post">
    <input type="hidden" id="noc_id_for_certificate" name="noc_id_for_certificate">
</form>