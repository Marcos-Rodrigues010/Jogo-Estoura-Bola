$(function(){
    var intervalo
    var cont = 0
    $('#botão1').on('click', function(){
        $('.controle').animate({
            left: '2px',
            top: '2px',
            marginLeft: '2px',
            marginTop: '2px',
        }, 1000, 
        function(){    
        $('#botão1').html('Pause').off('click')
        .on('click', controleEstado)
        .after('<button id="botão2" class="btn btn-lg btn-outline-primary">Parar</button>')
        $('#botão2').css('margin-top', '3px').bind('click', parar)
        intervalo = setInterval(addBola, 1000)
        })
    })
    function addBola(){
        var x = Math.floor((Math.random() * 800 + 112))
        var y = Math.floor(Math.random() * 500)
        var bola = document.createElement('div')
        $(bola).css({"margin-left": x+"px", "margin-top": y+"px"})
        $(bola).addClass('bola')
        $(bola).on('click', sumir)
        $('body').append(bola)
    }
    function sumir(){
        $(this).fadeOut('fast')
        cont++
        $('#pontos').html(cont)
    }
    function controleEstado(){
        if($(this).html() == 'Pause'){
            clearInterval(intervalo)
            $(this).html('Continuar')
            $('.bola').off('click')
        }else{
            intervalo = setInterval(addBola, 1000)
            $(this).html('Pause')
            $('.bola').on('click', sumir)
        }
    }
    function parar(){
        clearInterval(intervalo)
        $('.bola').off('click').css('display', 'none')
        $('button').remove()
        $('.controle').animate({
            width: '300px',
            height: '200px',
            top: '40%',
            left: '40%',
            marginTop: '-60px',
            marginLeft: '-60px'
        }, 500,
        function(){
            $('.placar').html(`Você fez ${cont} pontos!`)
            .css('font-size', '50px')
            .after('<button id="recarregar" class="btn btn-lg btn-block btn-outline-primary">Jogar novamente</button>')
            $('#recarregar').css('margin-top', '3px')
            $('#recarregar').bind('click', function(){
                location.reload()
            })
        })
    }
})



