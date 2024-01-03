<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Registration Of Establishments Employing Building Workers</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">BOCW</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="bocw_datatable_container">
    </div>
    <div class="container-fluid" id="bocw_form_container">
    </div>
</section>
<form target="_blank" id="bocw_form1_pdf_form" action="bocw/generate_form1" method="post">
    <input type="hidden" id="bocw_id_for_bocw_form1" name="bocw_id_for_bocw_form1">
</form>
<form target="_blank" id="bocw_certificate_pdf_form" action="bocw/generate_certificate" method="post">
    <input type="hidden" id="bocw_id_for_certificate" name="bocw_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_bocw" action="bocw/generate_excel" method="post">
</form>