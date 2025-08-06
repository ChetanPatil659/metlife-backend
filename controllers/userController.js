import User from "../models/User.js";

export async function addInfo(req, res) {
  try {
    console.log("========= /add-info =========")
    console.log("req.query", req.query);
    console.log("req.body", req.body);
    const { ref, utm, utm_source, utm_campaign } = req.query;
    const { name, city, employeeCode, buisnessCode, mobile, consent, type } =
      req.body;
    let user;

    switch (ref) {
      case "agency":
        if (type === "buisnessCode") {
          user = await User.create({
            name,
            buisnessCode,
            mobile,
            consent,
            channel: ref,
            utm,
            utm_source,
            utm_campaign,
          });
        } else {
          user = await User.create({
            name,
            employeeCode,
            mobile,
            consent,
            channel: ref,
            utm,
            utm_source,
            utm_campaign,
          });
        }
        break;
      case "pnb":
        user = await User.create({
          name,
          employeeCode,
          mobile,
          consent,
          channel: ref,
          utm,
          utm_source,
          utm_campaign,
        });
        break;
      case "jkb":
        user = await User.create({
          name,
          employeeCode,
          mobile,
          consent,
          channel: ref,
          utm,
          utm_source,
          utm_campaign,
        });
        break;
      case "kbl":
        user = await User.create({
          name,
          employeeCode,
          mobile,
          consent,
          channel: ref,
          utm,
          utm_source,
          utm_campaign,
        });
        break;
      case "psf":
        user = await User.create({
          name,
          employeeCode,
          mobile,
          consent,
          channel: ref,
          utm,
          utm_source,
          utm_campaign,
        });
        break;
      case "social_media":
        user = await User.create({
          name,
          city,
          mobile,
          consent,
          channel: "social_media",
          utm,
          utm_source,
          utm_campaign,
        });
        break;
      default:
        user = await User.create({
          name,
          city,
          mobile,
          consent,
          channel: "social_media",
          utm,
          utm_source,
          utm_campaign,
        });
        break;
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function addQuiz(req, res) {
  try {
    console.log("========= /add-quiz =========")
    console.log("req.query", req.query);
    console.log("req.body", req.body);
    const { id } = req.query;
    const { age, retirementAge, monthlyExpense } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { age, retirementAge, monthlyExpense },
      { new: true }
    );

    function calculateFutureValue(
      principal,
      rateOfInflation,
      retirementAge,
      currentAge
    ) {
      const years = retirementAge - currentAge;
      const futureValue = principal * Math.pow(1 + rateOfInflation, years);
      return futureValue;
    }

    function calculateRetirementCorpus(
      futureValue,
      rateOfInflation,
      lifeExpectancy,
      retirementAge
    ) {
      const yearsAfterRetirement = lifeExpectancy - retirementAge;
      const factor =
        (Math.pow(1 + rateOfInflation, yearsAfterRetirement) - 1) /
        rateOfInflation;
      const corpusRequired = futureValue * factor;
      return corpusRequired;
    }

    function calculateYearlyInvestment(
      corpusRequired,
      growthRate,
      lifeExpectancy,
      retirementAge
    ) {
      const yearlyInvestment =
        (corpusRequired * growthRate) /
        (Math.pow(1 + growthRate, lifeExpectancy - retirementAge) - 1);
      return yearlyInvestment;
    }

    const life_expectancy = 75;
    const inflation_rate = 0.06;
    const growth_rate = 0.12;

    const principal_amount = monthlyExpense * 12;

    const future_value = calculateFutureValue(
      principal_amount,
      inflation_rate,
      retirementAge,
      age
    );

    const retirement_corpus = calculateRetirementCorpus(
      future_value,
      inflation_rate,
      life_expectancy,
      retirementAge
    );

    const yearly_investment = calculateYearlyInvestment(
      retirement_corpus,
      growth_rate,
      life_expectancy,
      retirementAge
    );

    user.yearlyInvestment = yearly_investment.toFixed(2);
    user.retirementCorpus = retirement_corpus.toFixed(2);
    user.futureValue = future_value.toFixed(2);

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getRecommendation(req, res) {

  try {
    console.log("========= /get-recommendation =========")
    console.log("req.query", req.query);
    console.log("req.body", req.body);
    const { id } = req.query;
    const user = await User.findById(id);
    let response = {};
    switch (user.channel) {
      case "agency":
        response.recommendedPlan = ["HYBRID", "CENTURY"];
        response.user = user;
        break;
      case "pnb":
        response.recommendedPlan = ["HYBRID", "GAIN"];
        response.user = user;
        break;
      case "jkb":
        response.recommendedPlan = ["GAIN", "MGFP"];
        response.user = user;
        break;
      case "kbl":
        response.recommendedPlan = ["GAIN", "MGFP"];
        response.user = user;
        break;
      case "psf":
        response.recommendedPlan = ["HYBRID", "GAIN"];
        response.user = user;
        break;
      case "social_media":
        response.recommendedPlan = ["HYBRID", "GAIN"];
        response.user = user;
        break;
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
