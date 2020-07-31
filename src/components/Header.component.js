
export const Header = function(){
    return dillx(
        <>
            <style>
                span.sub {
                    font-size: 18px;
                    line-height: 18px;
                }
            </style>
            <header class="shadow">
                <h1>Oregano <span class="sub">v{version}</span></h1>
            </header>
        </>
    )
}
