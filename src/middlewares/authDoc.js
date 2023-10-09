async function authDocProducao(req, res, next) {
  const { senhaDigitada } = req.body;

  if (req.headers.host.includes("localhost") || req.originalUrl !== "/doc/") {
    // Usuario que esta no localhost nao precisa de senha para entrar na doc
    return next();
  }

  if (senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
    // usuario digitou a senha certa
    return next();
  }

  if (senhaDigitada) {
    // usuario digitou a senha errada
    res.status(401).set("Content-Type", "text/html");
    res.send(
      Buffer.from(`
    <form method="post">
      <p style="color: red">Senha errada!</p>
      <label for="senhaDigitada">Senha da documentação: </label>
      <input type="password" name="senhaDigitada" id="senhaDigitada"/>
      <button type="submit">Entrar</button
    </form> 
    `)
    );
  } else {
    // usuario ainda nao digitopu a senha e esta em mood producao
    res.status(200).set("Content-Type", "text/html");
    res.send(
      Buffer.from(`
    <form method="post">
      <label for="senhaDigitada">Senha da documentação: </label>
      <input type="password" name="senhaDigitada" id="senhaDigitada"/>
      <button type="submit">Entrar</button
    </form> 
    `)
    );
  }
}

module.exports = authDocProducao;
