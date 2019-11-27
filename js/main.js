const btnNR = document.getElementById("calcularE")
if (btnNR != undefined) {
  btnNR.addEventListener("click", () => {
    let datos = []
    try {
      let ecuacion = document.getElementById('txtEcuacion').value,
          valorX =  parseFloat(document.getElementById('txtValorX').value),
          valorY =  parseFloat(document.getElementById('txtValorY').value),
          valorH = parseFloat(document.getElementById('txtValorH').value),
          valorXFinal = parseFloat(document.getElementById('txtValorXFinal').value)
      
      if(ecuacion === '' || valorX === '' || valorY === '' || valorH === '' || valorXFinal === ''){
        alert('Debe ingresar todos los campos')
        return
      }
      let xAct = valorX
      let p = 0
      let fx = 0
      let fxMejorado = 0
      while (valorXFinal > xAct) {
        let i = valorH * p
        if(p == 0){
          datos.push({
            iteracion: p,
            valorX: xAct,
            euler: valorY,
            eulerMejorado: valorY
          })
          fx = nerdamer(ecuacion, { x: valorX, y: valorY })
          fxMejorado = nerdamer(ecuacion, { x: valorX, y: valorY })
        }else{
          let fxAct = parseFloat(eval(fx.toString()))
          //Euler Original
          let y = datos[p-1].euler + (valorH * fxAct)
       

          //Euler Mejorado
          let z = datos[p-1].eulerMejorado + valorH * parseFloat(eval(fxMejorado.toString()))
          let xi = xAct + valorH
          let f2 = nerdamer(ecuacion, { x: xi, y: z })
          let f2Act = parseFloat(eval(f2.toString()))
          let eMejorado = datos[p-1].eulerMejorado + (valorH / 2) * (parseFloat(eval(fxMejorado.toString())) + f2Act)
          datos.push({
            iteracion: p,
            valorX: xAct,
            euler: y,
            eulerMejorado: eMejorado
          })
          fx = nerdamer(ecuacion, { x: xAct, y: y })
          fxMejorado = nerdamer(ecuacion, { x: xAct, y: z })
        }
        p = p + 1
        xAct = xAct + valorH
      }
      let html = ''
      datos.forEach(d => {
        html += `
          <tr>
            <td>${d.iteracion}</td>
            <td>${decimales(d.valorX,1)}</td>
            <td>${decimales(d.euler,4)}</td>
            <td>${decimales(d.eulerMejorado,4)}</td>
          <tr>
        `
      })
      document.getElementById("bodyE").innerHTML = html;
    } catch (error) {
      alert(error.message);
    }
  });
}

function decimales(valor, decimales) {
  return parseFloat(valor).toFixed(decimales);
}
