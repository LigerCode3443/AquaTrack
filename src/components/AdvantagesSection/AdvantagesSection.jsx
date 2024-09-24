import { useTranslation } from "react-i18next";
import WrapperAdvantages from "../WrapperAdvantages/WrapperAdvantages";
import css from "./AdvantagesSection.module.css";

import user1 from "../../images/homeLoginRegister/users/user1.png";
import user2 from "../../images/homeLoginRegister/users/user2.png";
import user3 from "../../images/homeLoginRegister/users/user3.png";

const AdvantagesSection = () => {
  const { t } = useTranslation();
  return (
    <WrapperAdvantages>
      <div className={css.wrapper_users}>
        <ul className={css.list_users}>
          <li className={css.item_1}>
            <img
              src={user1}
              alt="user"
              width={28}
              height={28}
              className={css.img}
            />
          </li>
          <li className={css.item_2}>
            <img
              src={user2}
              alt="user"
              width={28}
              height={28}
              className={css.img}
            />
          </li>
          <li className={css.item_3}>
            <img
              src={user3}
              alt="user"
              width={28}
              height={28}
              className={css.img}
            />
          </li>
        </ul>
        <p className={css.text}>
          {t("description.inform.ourText")}&nbsp;
          <span className={css.accent}>
            {t("description.inform.happyText")}
          </span>{" "}
          {t("description.inform.customerText")}
        </p>
      </div>
      <ul className={css.list_offers}>
        <li className={css.item_offer_1}>
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#9be1a0",
              borderRadius: "100%",
            }}
          ></span>
          <p>{t("description.inform.habitText")}</p>
        </li>
        <li className={css.item_offer_2}>
          <p>{t("description.inform.statisticsText")}</p>
        </li>
        <li className={css.item_offer_3}>
          <p>{t("description.inform.settingText")}</p>
        </li>
      </ul>
    </WrapperAdvantages>
  );
};
export default AdvantagesSection;
