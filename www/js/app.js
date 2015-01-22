var AETMobile = angular.module("AETMobile", ['onsen','angular-md5']);

AETMobile.run(function($rootScope){
    document.addEventListener("backbutton", function (e) {
        if ($rootScope.ons.navigator.getPages().length > 1) 
        {
            e.preventDefault();
            $rootScope.ons.navigator.popPage();
        } 
        else 
        {
            navigator.app.exitApp();
        }
    }, false);
});

AETMobile.controller('loginCtrl', function($scope,md5, $rootScope) {
    
    $scope.credentials = {
        user:'',
        password:''
    };
    
    $scope.esqueceu_senha = function() 
    {
        ons.notification.alert({
            message: 'Foi enviado um link de recuperação para seu email cadastrado!',
            title: 'Recuperação de senha',
            buttonLabel: 'OK',
        });
    };
    
    $scope.login = function(credentials) 
    {
        validaLogin(credentials);
    };
    
    function validaLogin(credentials) {

        if(credentials.user != "" && credentials.password != "")
        {
            var hashPass = md5.createHash(credentials.user + credentials.password);
        }
        
        if(hashPass)
        {
            $rootScope.user = credentials.user;
            loginValido();
            
        }
        else
        {
            loginInvalido();
        }
    };

    function loginValido() {
        myNavigator.pushPage('sliding.html', { animation: "slide" });    
    };
    
    function loginInvalido() {
        ons.notification.alert({
            message: 'Login e/ou senha incorretos!',
            title: 'Atenção',
            buttonLabel: 'OK',
        });
    };
});

AETMobile.controller('homeCtrl', function($scope, $window, $rootScope) {    
    
    function buscaAET(numAET) {
        aets = angular.fromJson($window.localStorage.getItem('aets') || '[]');
    
        if(aets)
        {
            for (var x = 0; x < aets.length; x++) 
            {
                aet = aets[x];
                
                if(aet.cdAET == numAET)
                {
                    aetsFiscalizadas = angular.fromJson($window.localStorage.getItem('aetsFiscalizadas') || '[]');
                    novo = true;
                    for (var y = 0; y < aetsFiscalizadas.length; y++) 
                    {
                        if(x == aetsFiscalizadas[y])
                        {
                            novo = false;
                            break;
                        }
                    }
                    if(novo)
                    {
                        aetsFiscalizadas.push(x);
                        $window.localStorage.setItem('aetsFiscalizadas', angular.toJson(aetsFiscalizadas));
                    }
                    
                    return aet;
                }
            }
        }
    };
    
    $scope.EscanearCodBarras = function scanBarcode() {
        
        window.plugins.barcodeScanner.scan( function(result) 
        {
            numAet = result.text
            if(numAet != "")
            {
                aet = buscaAET(numAET);
                if(aet)
                {
                    myNavigator.pushPage('tab_home.html', { animation: "slide" });
                    $rootScope.aet = aet;
                }
                else
                {
                    ons.notification.alert({
                    message: 'A AET não foi encontrada na base local!',
                    title: 'Atenção',
                    buttonLabel: 'OK',
                    });
                }
            }
                 
        }, function(error) {
                ons.notification.alert({
                    message: 'Não foi possível efetuar a busca: ' + error,
                    title: 'Erro',
                    buttonLabel: 'OK',
                });
            }
      );
    };
    
    $scope.BuscaManual = function scanManual() { 
        var num_aet = $scope.field_search;
        
        if(num_aet && num_aet != "")
        {            
            aet = buscaAET(num_aet);
            if(aet)
            {
                myNavigator.pushPage('tab_home.html', { animation: "slide" });
                $rootScope.aet = aet;
                $scope.field_search = "";
            }
            else
            {
                $scope.field_search = "";
                ons.notification.alert({
                message: 'AET não encontrada na base local!',
                title: 'Atenção',
                buttonLabel: 'OK',
                });
            }
        }
    };
});

AETMobile.controller('transporteCtrl', function($scope, $window) {
    
    $scope.objeto = '';

    $scope.toggleObjeto = function(objeto) 
    {
        if ($scope.isObjetoShown(objeto)) 
        {
            $scope.shownObjeto = null;
        } 
        else 
        {
            $scope.shownObjeto = objeto;
        }
    };
  
    $scope.isObjetoShown = function(objeto) {
        return $scope.shownObjeto === objeto;
    };  
});

AETMobile.controller('unidadeTracaoCtrl', function($scope) {
    
    $scope.objeto = '';
    
    $scope.toggleObjeto = function(objeto) 
    {
        if ($scope.isObjetoShown(objeto)) 
        {
            $scope.shownObjeto = null;
        } 
        else 
        {
            $scope.shownObjeto = objeto;
        }
    };
  
    $scope.isObjetoShown = function(objeto) {
        return $scope.shownObjeto === objeto;
    };
  
});

AETMobile.controller('eixosCtrl', function($scope) {

    $scope.objeto = '';
    
    $scope.toggleObjeto = function(objeto) 
    {
        if ($scope.isObjetoShown(objeto)) 
        {
            $scope.shownObjeto = null;
        } 
        else 
        {
            $scope.shownObjeto = objeto;
        }
    };
  
    $scope.isObjetoShown = function(objeto) {
        return $scope.shownObjeto === objeto;
    };  
});

AETMobile.controller('comprimentosCtrl', function($scope) {
    
    $scope.objeto = '';
    
    $scope.toggleObjeto = function(objeto) 
    {
        if ($scope.isObjetoShown(objeto)) 
        {
            $scope.shownObjeto = null;
        } 
        else 
        {
            $scope.shownObjeto = objeto;
        }
    };
  
    $scope.isObjetoShown = function(objeto) {
        return $scope.shownObjeto === objeto;
    };  
});

AETMobile.controller('pesosCtrl', function($scope) {
    
    $scope.objeto = '';
    
    $scope.toggleObjeto = function(objeto) 
    {
        if ($scope.isObjetoShown(objeto)) 
        {
            $scope.shownObjeto = null;
        } 
        else 
        {
            $scope.shownObjeto = objeto;
        }
    };
  
    $scope.isObjetoShown = function(objeto) {
        return $scope.shownObjeto === objeto;
    };
});

AETMobile.controller('itinerarioCtrl', function($scope) {
    
    $scope.itinerario;

});

AETMobile.controller('aprovacaoCtrl', function($scope, $rootScope, $window) {
    
    
    function aprovaAET() {
        aets = angular.fromJson($window.localStorage.getItem('aets') || '[]');
        aet = $rootScope.aet;
        
        for (var x = 0; x < aets.length; x++) 
        {
            if (aet.cdAET == aets[x].cdAET)
            {
                aet.data = new Date();         
                aet.usuario = $rootScope.user;
                aet.status = 'Aprovada';
                aet.motivo = '';
                
                $rootScope.aet = aet;
                aets[x] = aet;
                
                $window.localStorage.removeItem('aets');
                $window.localStorage.setItem('aets', angular.toJson(aets));
                break;
            }
        }
    };
    
    $scope.aprovarAET = function() 
    {        
        ons.notification.confirm({
            message: 'Deseja aprovar AET?',
            callback: function(idx) {
                switch(idx) {
                    case 0:
                        break;
                    
                    case 1:
                        aprovaAET();
                        ons.notification.alert({
                            message: 'AET Aprovada com sucesso!',
                            title: 'Sucesso',
                            buttonLabel: 'OK',
            
                            callback: function() {
                                myNavigator.popPage();
                            }
                        });
                        break;
                }
            }
        });
    };
    
    $scope.reprovarAET = function() 
    {
        ons.ready(function() {
        modalReprovacao.show();
        });
    };
    
    $scope.exibeAprovacao = function(aet) 
    {
        if(aet.status == '')
        {
            return true;
        }
        else
        {
            return false;
        }
    };
});

AETMobile.controller('reprovacaoCtrl', function($scope, $window, $rootScope) {
    
    $scope.list = [ { "id" : "1" , "name" : "Peso errado" } , { "id" : "2" , "name" : "Altura errada" } , { "id" : "3" , "name" : "Data errada"} ];
    
    function reprovaAET() {
        aets = angular.fromJson($window.localStorage.getItem('aets') || '[]');
        aet = $rootScope.aet;
        
        for (var x = 0; x < aets.length; x++) 
        {
            if (aet.cdAET == aets[x].cdAET)
            {
                aet.data = new Date();         
                aet.usuario = $rootScope.user;
                aet.status = 'Reprovada';
                aet.motivo = '';
                
                $rootScope.aet = aet;
                aets[x] = aet;
                
                $window.localStorage.removeItem('aets');
                $window.localStorage.setItem('aets', angular.toJson(aets));
                break;
            }
        }
    };
    
    $scope.confirmarReprovacao = function() 
    {
        reprovaAET();
        
        ons.notification.alert({
            message: 'AET reprovada com sucesso!',
            title: 'Sucesso',
            buttonLabel: 'OK',
            
            callback: function() {
                
                $scope.modalReprovacao.hide();
                myNavigator.popPage();
            }
        });
            
        
    };
    
    $scope.reprovacao = 'Teste';
    
    $scope.toggleObjeto = function(objeto) 
    {
        if ($scope.isObjetoShown(objeto)) 
        {
            $scope.shownObjeto = null;
        } 
        else 
        {
            $scope.shownObjeto = objeto;
        }
    };
  
    $scope.isObjetoShown = function(objeto) {
        return $scope.shownObjeto === objeto;
    };
    
});


AETMobile.controller('menuCtrl', function($scope,$window, $rootScope) {
    
    $scope.goAetsFiscalizadas = function() 
    {
        listaIndex = angular.fromJson($window.localStorage.getItem('aetsFiscalizadas') || '[]');
    
        if(listaIndex && listaIndex.length > 0)
        {
            aets = angular.fromJson($window.localStorage.getItem('aets') || '[]');
            listaAetsFiscalizadas = [];
            
            for (var x = 0; x < listaIndex.length; x++) 
            {
                index = listaIndex[x];
                listaAetsFiscalizadas.push(aets[index]);   
            }
            
            $rootScope.aetsFiscalizadas = listaAetsFiscalizadas;
            myNavigator.pushPage('aets_fiscalizadas.html', { animation: "slide" });
        }
        else
        {
            ons.notification.alert({
            message: 'Não existem AETs fiscalizadas para exibição',
            title: 'Sucesso',
            buttonLabel: 'OK',
            });
        }
    };
    
    $scope.sair = function() 
    {
        ons.notification.confirm({
            message: 'Deseja realmente sair?',
            callback: function(idx) {
                switch(idx) {
                    case 0:
                        break;
                    
                    case 1:
                        myNavigator.pushPage('login.html', { animation: "slide" });
                        break;
                }
            }
        });
    };
    
   
    
    $scope.atualizar = function() 
    {
    
        ons.notification.confirm({
            message: 'Deseja efetuar a sincronização das AETs?',
            callback: function(idx) {
                switch(idx) {
                    case 0:
                        break;
                    
                    case 1:
                        ons.slidingMenu.close();
                        ons.ready(function() {
                            sincronizar();
                        });
                        break;
                }
            }
        });
    };
    
    function sincronizar(){
            modalAtualizacao.show();    
            insereDadosLocalStorage();
            setTimeout('modalAtualizacao.hide()', 5000);
    };
    
    function insereDadosLocalStorage() {
        
        $window.localStorage.clear();
        
        endereco = 
        {
            logradouro:'Rua da prata, 685, Nova Barra',
            cep:'68.545-001',
            uf:'MT',
            cidade:'Barra das Garças',
            pais:'Brasil'
        };
            
        transportador = 
        {
            nome:'João Gomes Santos',
            endereco:endereco,
            propriedade:'Express Transportes LTDA',
            rg:'50505050-50',
            cpf:'505.050.505-50',
            inicioPeriodo:'13/02/2014',
            fimPeriodo:'20/09/2014',
            tipoCargo:'Cargas Gerais e Granel'
        };

        unidadeTracao = 
        {
            marca:'SCANIA/GUERRA',
            modelo:'G 440 A6x4 / AG GR / AG',
            anoFabricacao:'2005',
            potencia:'448,00',
            direcao:'Hidráulica',
            subTipo:'Carroceria aberta',
            cmt:'78,00',
            numEscoltasPoliciais:'0',
            viagemUnica:'Não',
            numEscoltasEmpresas:'0',
            velocidade:'75'
        };
    
        dimensoes = 
        {
            alturaTotal:'4,950',
            larguraTotal:'2,800',
            larguraVeiculo:'2,800',
            excessoLateralDir:'0,000',
            excessoLateralEsq:'0,000',
            comprimentoVeiculo:'0,000',
            excessoDianteiro:'22,400',
            excessoTraseiro:'0,000'
        };

        pesos = 
        {
            pesoTotal:'33,500',
            peso1Unidade:'7,000',
            peso2Unidade:'0,000',
            peso1Carreta:'9,000',
            peso2Carreta:'0,000',
            pesoCarga:'17,000',
            pesoAcessorio:'0,000'        
        };
        
        eixos =
        [{
            numero:'1',
            tEixo:'6,00', 
            nRodaEixo:'2',
            dEntreEixo:'3,60'
        },
        {
            numero:'2',
            tEixo:'10,00', 
            nRodaEixo:'4',
            dEntreEixo:'12,40'
        },
        {
            numero:'3',
            tEixo:'17,00', 
            nRodaEixo:'4/4',
            dEntreEixo:'1,40/-'
        }];
    
        itinerarios =
        [{
            sigla:'GO-070',
            descricao:'Goiania / Inhumas / Itaberai / Goias / Jussara / Aragarças'
        },
        {
            sigla:'GO-080',
            descricao:'Goiania / Neropolis / Entr. BR153'
        },
        {
            sigla:'GO-081',
            descricao:'Entr. BR153 / Goianesia / Barro Alto'
        },
        {
            sigla:'GO-139',
            descricao:'Curumbaiba / Caldas Novas / Entr. GO217'
        },
        {
            sigla:'GO-147',
            descricao:'Entr.GO213 / Piracunjuba / Bela Vista'
        }];

        unidadesAcopladas =
        [{
            placa:'KAB5455'
        },
        {
            placa:'KAB5548'
        },
        {
            placa:'KIB8954'
        },
        {
            placa:'KMB8742'
        },
        {
            placa:'KBE8745'
        },
        {
            placa:'KID8784'
        },
        {
            placa:'KBD8784'
        },
        {
            placa:'KEW7874'
        },
        {
            placa:'KWE8748'
        },
        {
            placa:'KAF8774'
        }];
        
        aets =
        [{
            cdAET:'12345',
            nome:'AET 12345/2014/Teste 1',
            transportador:transportador,
            unidadeTracao:unidadeTracao,
            eixos:eixos,
            dimensoes:dimensoes,
            pesos:pesos,
            itinerarios:itinerarios,
            unidadesAcopladas:unidadesAcopladas,
        
            data:'',
            usuario:'',
            status:'',
            motivo:''
        },
        {
            cdAET:'67890',
            nome:'AET 67890/2014/Teste 2',
            transportador:transportador,
            unidadeTracao:unidadeTracao,
            eixos:eixos,
            dimensoes:dimensoes,
            pesos:pesos,
            itinerarios:itinerarios,
            unidadesAcopladas:unidadesAcopladas,
        
            data:'',
            usuario:'',
            status:'',
            motivo:''
        }];
        
        $window.localStorage.setItem('aets', angular.toJson(aets));
    };
});

AETMobile.controller('fiscalizadasCtrl', function($scope, $rootScope) {
    
    $scope.abrirAET = function(aetFiscalizada) 
    {   
        $rootScope.aet = aetFiscalizada;
        myNavigator.pushPage('tab_home.html', { animation: "slide" });
    };
    
});
