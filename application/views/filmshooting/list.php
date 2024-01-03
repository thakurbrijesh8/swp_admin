<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-10">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i>Application for Permission from District Collector for Movie Shooting Form</h1>
            </div>
            <div class="col-sm-2">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#home">Home</a></li>
                    <li class="breadcrumb-item active">Film Shooting</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="filmshooting_form_and_datatable_container">
    </div>
</section>
<form target="_blank" id="filmshooting_form1_pdf_form" action="filmshooting/generate_form1" method="post">
    <input type="hidden" id="filmshooting_id_for_filmshooting_form1" name="filmshooting_id_for_filmshooting_form1">
</form>
<form target="_blank" id="filmshooting_certificate_pdf_form" action="filmshooting/generate_certificate" method="post">
    <input type="hidden" id="filmshooting_id_for_certificate" name="filmshooting_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_filmshooting" action="filmshooting/generate_excel" method="post">
</form>