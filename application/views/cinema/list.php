<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fas fa-film"></i> Application for State Cinema Regulations</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Application for State Cinema Regulations</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="cinema_datatable_container">
    </div>
    <div class="container-fluid" id="cinema_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="cinema_form1_pdf_form" action="cinema/generate_form1" method="post">
    <input type="hidden" id="cinema_id_for_cinema_form1" name="cinema_id_for_cinema_form1">
</form>
<form target="_blank" id="cinema_certificate_pdf_form" action="cinema/generate_certificate" method="post">
    <input type="hidden" id="cinema_id_for_certificate" name="cinema_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_cinema" action="cinema/generate_excel" method="post">
</form>