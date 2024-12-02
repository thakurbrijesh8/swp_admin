<aside class="main-sidebar sidebar-dark-primary">
    <?php $this->load->view('common/logo'); ?>
    <!-- Sidebar -->
    <div class="sidebar">
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <?php if (!is_user_acc_ver()) { ?>
                    <li class="nav-item">
                        <a id="menu_dashboard" href="Javascript:void(0);" class="nav-link menu-close-click"
                           onclick="Dashboard.listview.listPage();">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>Dashboard</p>
                        </a>
                    </li>
                <?php } if (is_admin() || is_wm_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_weightandmeasure" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>Weights & Measures <i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="wmregistration" href="Javascript:void(0);"
                                   onclick="Wmregistration.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>New Registration W & M</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="repairer" href="Javascript:void(0);"
                                   onclick="Repairer.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>License for Repairer</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="repairer_renewal" href="Javascript:void(0);"
                                   onclick="RepairerRenewal.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Lice. for Repairer - Renewal</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="dealer" href="Javascript:void(0);"
                                   onclick="Dealer.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>License for Dealer</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="dealer_renewal" href="Javascript:void(0);"
                                   onclick="DealerRenewal.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Lice. for Dealer - Renewal</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="manufacturer" href="Javascript:void(0);"
                                   onclick="Manufacturer.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>License for Manufacturer</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="manufacturer_renewal" href="Javascript:void(0);"
                                   onclick="ManufacturerRenewal.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Lice. for Manuf. - Renewal</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="manufacturer_renewal" href="Javascript:void(0);"
                                   onclick="RII.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Reporting/Informing/Intimation to Legal Metrology Office</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="vc" href="Javascript:void(0);"
                                   onclick="VC.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Verification Certification</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="periodicalreturn" href="Javascript:void(0);"
                                   onclick="Periodicalreturn.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Periodical Return Form</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_pwd_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_pwd" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>P. W. D<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="wc" href="Javascript:void(0);"
                                   onclick="WC.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>New Water Connection</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_tourism_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_tourism" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>TOURISM<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="hotelregi" href="Javascript:void(0);"
                                   onclick="Hotelregi.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Hotel Registration Form</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="hotel_renewal" href="Javascript:void(0);"
                                   onclick="HotelRenewal.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Hotel Registration - Renewal </p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="travelagent" href="Javascript:void(0);"
                                   onclick="TravelAgent.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Travel Agency Registration Form</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="travelagentrenewal" href="Javascript:void(0);"
                                   onclick="TravelagentRenewal.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Travel Agency - Renwal Form</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="tourismevent" href="Javascript:void(0);"
                                   onclick="Tourismevent.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Tourism Event - Performance</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_sub_register_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_psfregistration" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>CRSR<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="psfregistration" href="Javascript:void(0);"
                                   onclick="Psfregistration.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Partnership Firms Regist</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="nil_certificate" href="Javascript:void(0);"
                                   onclick="NilCertificate.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-building nav-icon"></i>
                                    <p>Nil Certificate</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="property" href="Javascript:void(0);"
                                   onclick="Property.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Property Registration</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_rev_coll_dept_user() || is_arcs_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_collectorate" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>COLLECTORATE<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <?php if (is_admin() || is_rev_coll_dept_user() || is_view_all_district_user()) { ?>
                                <li class="nav-item">
                                    <a id="cinema" href="Javascript:void(0);"
                                       onclick="Cinema.listview.listPage();" class="nav-link menu-close-click">
                                        <i class="nav-icon fas fa-film"></i>
                                        <p>App. for State Cinema Reg.</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a id="filmshooting" href="Javascript:void(0);"
                                       onclick="FilmShooting.listview.listPage();" class="nav-link menu-close-click">
                                        <i class="nav-icon fas fa-film"></i>
                                        <p>Film Shooting Permission</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a id="na" href="Javascript:void(0);"
                                       onclick="Na.listview.listPage();" class="nav-link menu-close-click">
                                        <i class="nav-icon fas fa-film"></i>
                                        <p>Change In Land Use ( N.A.)</p>
                                    </a>
                                </li>
                                <!--                                <li class="nav-item">
                                                                    <a id="property" href="Javascript:void(0);"
                                                                       onclick="Property.listview.listPage();" class="nav-link menu-close-click">
                                                                        <i class="nav-icon fas fa-film"></i>
                                                                        <p>Cinema Form</p>
                                                                    </a>
                                                                </li>-->
                            <?php } if (is_admin() || is_arcs_user() || is_view_all_district_user()) { ?>
                                <li class="nav-item">
                                    <a id="menu_society_registration" href="Javascript:void(0);"
                                       onclick="SocietyRegistration.listview.listPage();" class="nav-link menu-close-click">
                                        <i class="nav-icon fas fa-building"></i>
                                        <p>Society Registration</p>
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_dic_dept_user() || is_dic_dnh_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_dic" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>DIC DD & DNH<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="textile" href="Javascript:void(0);"
                                   onclick="Textile.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>For TEXTILE Sectors</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="msme" href="Javascript:void(0);"
                                   onclick="MSME.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>For MSME</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="ips" href="Javascript:void(0);"
                                   onclick="Ips.listview.listPageForIncentives();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-file-signature"></i>
                                    <p>For IPS 2022 to 2027</p>
                                </a>
                            </li>
                        </ul>
                        <?php if (is_admin() || is_dic_dnh_dept_user() || is_view_all_district_user()) { ?>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <a id="landallotment" href="Javascript:void(0);"
                                       onclick="Landallotment.listview.listPage();" class="nav-link menu-close-click">
                                        <i class="nav-icon fas fa-industry"></i>
                                        <p>For ALLOTMENT OF PLOT</p>
                                    </a>
                                </li>
                            </ul>
                        <?php } ?>
                    </li>
                <?php } if (is_admin() || is_dic_dept_user() || is_dic_dnh_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_dic" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>DIC DNH<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="textile" href="Javascript:void(0);"
                                   onclick="Noc.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>NOC for Mortgage</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="textile" href="Javascript:void(0);"
                                   onclick="Seller.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>Seller of Plot For Lease</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="textile" href="Javascript:void(0);"
                                   onclick="Transfer.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>Buyer of Plot For Lease</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="textile" href="Javascript:void(0);"
                                   onclick="Subletting.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>Sub-Letting for Lessee</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="textile" href="Javascript:void(0);"
                                   onclick="Sublessee.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>Sub-Letting for Sub-Lessee</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_pda_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_pda" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>PDA<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="construction" href="Javascript:void(0);"
                                   onclick="Construction.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>Construction Permission</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="occupancycertificate" href="Javascript:void(0);"
                                   onclick="OccupancyCertificate.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>Occupancy Certificate</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="inspection" href="Javascript:void(0);"
                                   onclick="Inspection.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-industry"></i>
                                    <p>Inspection at Plinth Level.</p>
                                </a>
                            </li>
                        </ul>
                        <!--   <ul class="nav nav-treeview">
                              <li class="nav-item">
                                  <a id="site" href="Javascript:void(0);"
                                     onclick="Site.listview.listPage();" class="nav-link menu-close-click">
                                      <i class="nav-icon fas fa-industry"></i>
                                      <p>Site Elevation </p>
                                  </a>
                              </li>
                          </ul>
                          <ul class="nav nav-treeview">
                              <li class="nav-item">
                                  <a id="zone" href="Javascript:void(0);"
                                     onclick="Zone.listview.listPage();" class="nav-link menu-close-click">
                                      <i class="nav-icon fas fa-industry"></i>
                                      <p>Zone Information </p>
                                  </a>
                              </li>
                          </ul> -->
                    </li>
                <?php } if (is_admin() || is_labour_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_labour" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>LABOUR<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_clact" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="CLACT.listview.listPage();">
                                    <i class="nav-icon fas fa-file-signature"></i>
                                    <p>Pri. Emp. Under CLACT</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_bocw" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="BOCW.listview.listPage();">
                                    <i class="nav-icon fas fa-building"></i>
                                    <p>Under BOCW Act</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_shop_and_establishment" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="Shop.listview.listPage();">
                                    <i class="nav-icon fa fa-store"></i>
                                    <p>Under Shops & Esta. Act</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_shop_renewal" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="ShopRenewal.listview.listPage();">
                                    <i class="nav-icon fa fa-store"></i>
                                    <p>Under Shop & Esta. - Renewal</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_interstate_mw" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="MigrantWorkers.listview.listPage();">
                                    <i class="nav-icon fas fa-users"></i>
                                    <p>Under I.S.M.W. Act</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_migrantworkers_renewal" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="MigrantworkersRenewal.listview.listPage();">
                                    <i class="nav-icon fas fa-users"></i>
                                    <p>Under I.S.M.W. Act - Renewal</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_singlereturn" href="Javascript:void(0);"
                                   onclick="SingleReturn.listview.listPageForSingleReturn();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-money-bill-alt"></i>
                                    <p>Single Annual Return form</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_aplicence" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="Aplicence.listview.listPage();">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Lice. Contracts Labour Act.</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_aplicence_renewal" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="AplicenceRenewal.listview.listPage();">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Lice. Cont. Labour - Renewal</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_ismw" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="ISMW.listview.listPage();">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>I.S.M.W Returnees</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_fb_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_factory" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>UNDER F & B Act<i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_factory_license" href="Javascript:void(0);"
                                   onclick="FactoryLicense.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Factories License</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_factory_license_renewal" href="Javascript:void(0);"
                                   onclick="FactoryLicenseRenewal.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-id-card nav-icon"></i>
                                    <p>Factories License - Renewal</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_building_plan" href="Javascript:void(0);"
                                   onclick="BuildingPlan.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-building nav-icon"></i>
                                    <p>Factories Bldg. Plan Approval</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_boiler_act" href="Javascript:void(0);"
                                   onclick="BoilerAct.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-file-signature nav-icon"></i>
                                    <p>Regis. Under Boiler Act</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_boiler_act_renewal" href="Javascript:void(0);"
                                   onclick="BoilerActRenewal.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-file-signature nav-icon"></i>
                                    <p>Regis. Under Boiler Act - Renewal</p>
                                </a>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_boiler_manufacture" href="Javascript:void(0);"
                                   onclick="BoilerManufacture.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-file-signature nav-icon"></i>
                                    <p>Boiler Manufactures</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_ismw_user()) { ?>
                    <li class="nav-item">
                        <a id="menu_ismw" href="Javascript:void(0);"
                           onclick="ISMW.listview.listPage();" class="nav-link menu-close-click">
                            <i class="fas fa-id-card nav-icon"></i>
                            <p>I.S.M.W Returnees</p>
                        </a>
                    </li>
                <?php } if (is_admin() || is_inspections_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_inspections" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-check-double"></i>
                            <p>Inspections <i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_sc_inspections" href="Javascript:void(0);"
                                   onclick="SCInspections.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-check-double"></i>
                                    <p>Insp. (Surprise / Complaint)</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="menu_sj_inspections" href="Javascript:void(0);"
                                   onclick="SJInspections.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-check-double"></i>
                                    <p>Insp. (Synchronized / Joint)</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="menu_c_inspections" href="Javascript:void(0);"
                                   onclick="CInspections.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-check-double"></i>
                                    <p>Central Inspections(CIS)</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_forest_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_forest" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>FOREST <i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_tree_cutting" href="Javascript:void(0);"
                                   onclick="TreeCutting.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="nav-icon fas fa-tree"></i>
                                    <p>Tree Cutting Permission</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_dic_dept_user() || is_dic_dnh_dept_user() || is_view_all_district_user()) { ?>
                    <li class="nav-item">
                        <a id="menu_query_grievance" href="Javascript:void(0);"
                           onclick="QueryGrievance.listview.listPage();" class="nav-link menu-close-click">
                            <i class="nav-icon fa fa-question-circle"></i>
                            <p>Query / Grievance Redressal</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a id="menu_cfr" href="Javascript:void(0);"
                           onclick="CFR.listview.listPage();" class="nav-link menu-close-click">
                            <i class="nav-icon fas fa-comment-dots"></i>
                            <p>Comments / Feedback</p>
                        </a>
                    </li>
                <?php } if (is_admin() || is_view_all_district_user()) { ?>
                    <li class="nav-item">
                        <a id="menu_business" href="Javascript:void(0);" class="nav-link menu-close-click"
                           onclick="Business.listview.listPage();">
                            <i class="nav-icon fas fa-briefcase"></i>
                            <p>Manage Business</p>
                        </a>
                    </li>
                    <?php
                } if (is_admin() || is_view_all_district_user() || is_wm_dept_user() || is_pwd_dept_user() || is_tourism_dept_user() || is_sub_register_dept_user() ||
                        is_rev_coll_dept_user() || is_dic_dept_user() || is_dic_dnh_dept_user() || is_pda_dept_user() ||
                        is_labour_dept_user() || is_fb_dept_user() || is_forest_user() || is_arcs_user()) {
                    ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_opd" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-money-check"></i>
                            <p>Online Payment Details <i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_oph" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="Dashboard.listview.listPageForOPH();">
                                    <i class="nav-icon fas fa-rupee-sign"></i>
                                    <p>Online Payment History</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="menu_hwr" href="Javascript:void(0);" class="nav-link menu-close-click"
                                   onclick="Dashboard.listview.listPageForHWR();">
                                    <i class="nav-icon fas fa-heading"></i>
                                    <p>Head Wise Report</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_view_all_district_user()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_users" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-cogs"></i>
                            <p>Admin Master Manage. <i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <?php if (is_admin()) { ?>
                                <li class="nav-item">
                                    <a id="menu_dept_fd" href="Javascript:void(0);" class="nav-link menu-close-click"
                                       onclick="DeptFD.listview.listPage();">
                                        <i class="nav-icon fas fa-money-check"></i>
                                        <p>Fee Details of Department(s)</p>
                                    </a>
                                </li>
                            <?php } ?>
                            <li class="nav-item">
                                <a id="menu_users_department" href="Javascript:void(0);"
                                   onclick="Department.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-building nav-icon"></i>
                                    <p>Department(s)</p>
                                </a>
                            </li>
                            <?php if (is_admin()) { ?>
                                <li class="nav-item">
                                    <a id="menu_users_employee" href="Javascript:void(0);"
                                       onclick="Employee.listview.listPage();" class="nav-link menu-close-click">
                                        <i class="fas fa-briefcase nav-icon"></i>
                                        <p>Employee</p>
                                    </a>
                                </li>
                            <?php } ?>
                            <li class="nav-item">
                                <a id="menu_users_service" href="Javascript:void(0);"
                                   onclick="Service.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-server nav-icon"></i>
                                    <p>Service(s)</p>
                                </a>
                            </li>
                            <?php if (is_admin()) { ?>
                                <li class="nav-item">
                                    <a id="menu_users_officer" href="Javascript:void(0);"
                                       onclick="Officer.listview.listPage();" class="nav-link menu-close-click">
                                        <i class="fas fa-user-check nav-icon"></i>
                                        <p>Officer</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a id="menu_users_user" href="Javascript:void(0);"
                                       onclick="Users.listview.listPage();" class="nav-link menu-close-click">
                                        <i class="fas fa-users nav-icon"></i>
                                        <p>Users</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a id="menu_users_user_type" href="Javascript:void(0);"
                                       onclick="Users.listview.listPageForUserType();" class="nav-link menu-close-click">
                                        <i class="fas fa-list-alt nav-icon"></i>
                                        <p>User Type</p>
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </li>
                <?php } if (is_admin() || is_user_acc_ver()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_client_mm" href="Javascript:void(0)" class="nav-link">
                            <i class="nav-icon fas fa-cogs"></i>
                            <p>Client Master Manage. <i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_client_active_users" href="Javascript:void(0);"
                                   onclick="ActiveUsers.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-users nav-icon"></i>
                                    <p>Active Users</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="menu_client_vp_users" href="Javascript:void(0);"
                                   onclick="VPUsers.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-users nav-icon"></i>
                                    <p>Pending Verification Users</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="menu_client_deleted_users" href="Javascript:void(0);"
                                   onclick="VPUsers.listview.loadDeletedUserData();" class="nav-link menu-close-click">
                                    <i class="fas fa-users nav-icon"></i>
                                    <p>Deleted Users</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } if (is_admin()) { ?>
                    <li class="nav-item has-treeview">
                        <a id="menu_logs" href="Javascript:void(0);" class="nav-link">
                            <i class="nav-icon fas fa-list-alt"></i>
                            <p>Logs <i class="right fas fa-angle-left"></i></p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a id="menu_logs_login_detail" href="Javascript:void(0);"
                                   onclick="Logs.listview.listPage();" class="nav-link menu-close-click">
                                    <i class="fas fa-user-lock nav-icon"></i>
                                    <p>Login Details</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php } ?>
                <li class="nav-item">
                    <a id="menu_change_password" href="Javascript:void(0);"
                       onclick="Users.listview.listPageForChangePassword();" class="nav-link menu-close-click">
                        <i class="nav-icon fa fa-key"></i>
                        <p>Change Password</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a id="menu_logout" href="<?php echo base_url() ?>login/logout" class="nav-link menu-close-click" onclick="activeLink('menu_logout');">
                        <i class="nav-icon fa fa-sign-out-alt"></i>
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>