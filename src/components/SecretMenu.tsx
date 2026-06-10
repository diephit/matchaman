import { secretMenu } from '../data/secretMenu';

const SECRET_MENU_KEY = 'matchaman.secretMenuChoice.v1';

type SecretMenuProps = {
  onToast: (message: string) => void;
};

export function SecretMenu({ onToast }: SecretMenuProps) {
  function saveChoice(itemName: string) {
    window.localStorage.setItem(
      SECRET_MENU_KEY,
      JSON.stringify({
        itemName,
        savedAt: new Date().toISOString(),
      }),
    );
    onToast(`Đã lưu ${itemName} cho lần sau`);
  }

  return (
    <section className="secret-section" aria-label="Secret Menu">
      <div className="section-heading">
        <p className="eyebrow">Secret Menu</p>
        <h2>Vuốt ngang để chọn mood cho lần sau</h2>
      </div>

      <div className="menu-scroller" aria-label="Danh sách món bí mật">
        {secretMenu.map((item) => (
          <article className="menu-card" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="tag-row">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <button className="secondary-button" type="button" onClick={() => saveChoice(item.name)}>
              Đặt món này cho lần sau
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
