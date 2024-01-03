<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i>Permission for sub-letting of premises on Plot For Sub-Lessee
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Sub-Lessee</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="sublessee_datatable_container">
    </div>
    <div class="container-fluid" id="sublessee_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="sublessee_form1_pdf_form" action="sublessee/generate_form1" method="post">
    <input type="hidden" id="sublessee_id_for_sublessee_form1" name="sublessee_id_for_sublessee_form1">
</form>
<form target="_blank" id="sublessee_certificate_pdf_form" action="sublessee/generate_certificate" method="post">
    <input type="hidden" id="sublessee_id_for_certificate" name="sublessee_id_for_certificate">
</form>