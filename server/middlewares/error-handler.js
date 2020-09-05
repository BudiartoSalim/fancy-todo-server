function HTMLErrorCheckHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    res.status(400).json(err);
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json(err.message)
  } else if (err === 'InvalidLogin') {
    res.status(400).json({ errors: ["Invalid Username/Password"] })
  } else if (err.name === 'SequelizeConnectionError') {
    res.status(404).json(err);
  } else if (err === 'Not found') {
    res.status(404).json({ errors: ["Not found"] })
  } else {
    res.status(500).json({ errors: ['Internal Server Error'] });
  }
}

module.exports = HTMLErrorCheckHandler;