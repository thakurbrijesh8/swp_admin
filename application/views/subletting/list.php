<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i>Permission for sub-letting of premises on Plot For Lessee
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Lessee</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="subletting_datatable_container">
    </div>
    <div class="container-fluid" id="subletting_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="subletting_form1_pdf_form" action="subletting/generate_form1" method="post">
    <input type="hidden" id="subletting_id_for_subletting_form1" name="subletting_id_for_subletting_form1">
</form>
<form target="_blank" id="subletting_certificate_pdf_form" action="subletting/generate_certificate" method="post">
    <input type="hidden" id="subletting_id_for_certificate" name="subletting_id_for_certificate">
</form>