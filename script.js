async function consultarAr() { 
  const cidade = document.getElementById("cidade").value; 
  const resultado = document.getElementById("resultado"); 
 
  if (!cidade) { 
    resultado.innerHTML = "Por favor, digite uma cidade."; 
    return; 
  } 
 
  resultado.innerHTML = "Buscando dados..."; 
 
  try { 
    const resposta = await fetch(`https://api.api-ninjas.com/v1/airquality?city=${cidade}`, { 
      headers: { 
        "X-Api-Key": "nLYIWFYPfMswbwRRILVWkQ==gLVlBdEL8YOBoM8T" 
      } 
    }); 

    function classificarPM25(valor) { 
      if (valor <= 12) return "ÓTIMO 🟢"; 
      if (valor <= 35.4) return "REGULAR 🟠"; 
      return "RUIM 🔴"; 
    }

    function classificarNO2(valor) { 
      if (valor <= 100) return "ÓTIMO 🟢"; 
      if (valor <= 200) return "REGULAR 🟠"; 
      return "RUIM 🔴"; 
    }

    function classificarO3(valor) { 
      if (valor <= 120) return "ÓTIMO 🟢"; 
      if (valor <= 180) return "REGULAR 🟠"; 
      return "RUIM 🔴"; 
    }

    if (resposta.status === 200) { 
      const dados = await resposta.json(); 

      resultado.innerHTML = ` 
        <h3>Qualidade do ar em <strong>${cidade}</strong></h3> 
        <p><strong>Índice Geral (AQI):</strong> ${dados.overall_aqi} — quanto menor, melhor.</p> 
        <p><strong>Partículas finas (PM2.5):</strong> ${dados["PM2.5"].concentration} µg/m³ 
        <br><em>Classificação:</em> ${classificarPM25(dados["PM2.5"].concentration)} </p>
        <p><strong>Dióxido de Nitrogênio (NO2):</strong> ${dados["NO2"].concentration} µg/m³ 
        <br><em>Classificação:</em> ${classificarNO2(dados["NO2"].concentration)} </p>
        <p><strong>Ozônio ao nível do solo (O3):</strong> ${dados["O3"].concentration} µg/m³ 
        <br><em>Classificação:</em> ${classificarO3(dados["O3"].concentration)} </p>
      `; 
    } else { 
      resultado.innerHTML = "Cidade não encontrada ou erro na consulta."; 
    } 
  } catch (erro) { 
    resultado.innerHTML = "Erro ao acessar a API."; 
    console.error(erro); 
  } 
}
