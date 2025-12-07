const tutorialService = require('../services/tutorialService');

class TutorialController {
  async listarTutoriais(req, res) {
    try {
      const tutoriais = tutorialService.listarTutoriais();
      res.json({
        sucesso: true,
        dados: tutoriais
      });
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        mensagem: error.message
      });
    }
  }

  async obterTutorialPorId(req, res) {
    try {
      const { id } = req.params;
      const tutorial = tutorialService.obterTutorialPorId(id);
      res.json({
        sucesso: true,
        dados: tutorial
      });
    } catch (error) {
      res.status(404).json({
        sucesso: false,
        mensagem: error.message
      });
    }
  }
}

module.exports = new TutorialController();

