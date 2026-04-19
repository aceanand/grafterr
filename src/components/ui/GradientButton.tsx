import styles from "./GradientButton.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  href: string;
};

type Props = ButtonProps | AnchorProps;

export function GradientButton(props: Props) {
  if (props.as === "a") {
    const { as: _as, ...rest } = props;
    return <a className={styles.btn} {...rest} />;
  }
  const { as: _as, ...rest } = props as ButtonProps;
  return <button className={styles.btn} type="button" {...rest} />;
}
